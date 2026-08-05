import React, { useState, useEffect } from 'react';
import {
  Folder,
  HardDrive,
  X,
  RefreshCw,
  Upload,
  Trash2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  File
} from 'lucide-react';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  listDriveFiles,
  saveBackupToDrive,
  deleteDriveFile,
  DriveFile,
  auth
} from '../lib/googleDrive';
import { User } from 'firebase/auth';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCountry?: string | null;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  savedCountry,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filesLoading, setFilesLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [backupTitle, setBackupTitle] = useState<string>('MatchMakerPro_Dating_Profile_Backup');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [fileToDeleteName, setFileToDeleteName] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        fetchFiles(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setFiles([]);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  const fetchFiles = async (token: string) => {
    setFilesLoading(true);
    setError(null);
    try {
      const fetched = await listDriveFiles(token);
      setFiles(fetched);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to load Google Drive files');
    } finally {
      setFilesLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        setSuccessMsg('Successfully connected Google Drive!');
        await fetchFiles(res.accessToken);
      }
    } catch (err: any) {
      setError(err?.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutGoogle();
      setUser(null);
      setAccessToken(null);
      setFiles([]);
      setSuccessMsg('Signed out of Google Drive.');
    } catch (err: any) {
      setError(err?.message || 'Logout failed.');
    }
  };

  const handleCreateBackup = async () => {
    if (!accessToken) {
      setError('Please sign in to Google Drive first.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const backupPayload = {
      app: 'Match Maker.Pro',
      createdAt: new Date().toISOString(),
      userEmail: user?.email || 'Anonymous',
      preferences: {
        preferredCountry: savedCountry || 'Global / All',
        datingGoals: 'Serious Relationship & Global Romance',
        verifiedOnly: true,
        ageRange: '21-45',
      },
      notes: 'Backup of romantic preferences and match directory criteria.',
    };

    try {
      const fileName = `${backupTitle.trim() || 'MatchMakerPro_Backup'}.json`;
      const created = await saveBackupToDrive(
        accessToken,
        fileName,
        JSON.stringify(backupPayload, null, 2)
      );
      setSuccessMsg(`Backup "${created.name}" saved to Google Drive!`);
      await fetchFiles(accessToken);
    } catch (err: any) {
      setError(err?.message || 'Failed to create backup file in Google Drive');
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (file: DriveFile) => {
    setConfirmDeleteId(file.id);
    setFileToDeleteName(file.name);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId || !accessToken) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await deleteDriveFile(accessToken, confirmDeleteId);
      setSuccessMsg(`File "${fileToDeleteName}" deleted from Google Drive.`);
      setConfirmDeleteId(null);
      await fetchFiles(accessToken);
    } catch (err: any) {
      setError(err?.message || 'Failed to delete file from Google Drive');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <ImageIcon className="w-4 h-4 text-pink-400" />;
    if (mimeType.includes('json') || mimeType.includes('text'))
      return <FileText className="w-4 h-4 text-purple-400" />;
    if (mimeType.includes('folder')) return <Folder className="w-4 h-4 text-amber-400" />;
    return <File className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f091d] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-purple-950/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0f091d] rounded-[14px] flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="font-century-gothic font-bold text-xl text-white flex items-center gap-2">
                Google Drive Integration
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                  Cloud Storage
                </span>
              </h3>
              <p className="text-xs text-purple-200/70 font-sans">
                Save match notes & browse files directly from Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Notifications */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* User Auth Status / Connect Card */}
          {!user ? (
            <div className="p-6 rounded-2xl glass-card text-center space-y-4 border border-purple-500/20">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HardDrive className="w-7 h-7" />
              </div>
              <h4 className="font-century-gothic font-bold text-lg text-white">
                Connect Google Drive
              </h4>
              <p className="text-xs text-purple-200/80 max-w-md mx-auto leading-relaxed">
                Connect your Google account to backup your romantic preferences, quiz responses, and view your Google Drive files securely.
              </p>

              {/* Official Google Sign-In Button Styling */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-800 font-medium text-sm transition-all shadow-lg hover:shadow-white/20 disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{loading ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-purple-300/60 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted OAuth2 authorization with user permission</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 gap-3">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border border-pink-500/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <h5 className="font-semibold text-sm text-white">{user.displayName || 'Google User'}</h5>
                    <p className="text-xs text-purple-300/70">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => accessToken && fetchFiles(accessToken)}
                    disabled={filesLoading}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Refresh Files"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${filesLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>

              {/* Action 1: Save Backup to Google Drive */}
              <div className="p-5 rounded-2xl glass-card border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-century-gothic font-bold text-sm text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-pink-400" />
                    Save Match Preferences to Google Drive
                  </h5>
                  <span className="text-[10px] text-purple-300/60 font-mono">.json format</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={backupTitle}
                    onChange={(e) => setBackupTitle(e.target.value)}
                    placeholder="File title"
                    className="flex-1 bg-purple-950/40 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={handleCreateBackup}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{loading ? 'Saving...' : 'Save to Drive'}</span>
                  </button>
                </div>
              </div>

              {/* Action 2: Files Browser */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-century-gothic font-bold text-sm text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-indigo-400" />
                    Recent Google Drive Files ({files.length})
                  </h5>
                </div>

                {filesLoading ? (
                  <div className="p-8 text-center text-xs text-purple-300/60 animate-pulse">
                    Loading your Google Drive files...
                  </div>
                ) : files.length === 0 ? (
                  <div className="p-8 text-center text-xs text-purple-300/60 border border-purple-500/20 rounded-2xl bg-purple-950/20">
                    No files found in your Google Drive or drive.file folder. Use "Save to Drive" above to create your first backup note!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-purple-950/30 hover:bg-purple-950/60 border border-purple-500/20 transition-all group"
                      >
                        <div className="flex items-center space-x-3 min-w-0 pr-2">
                          <div className="p-2 rounded-lg bg-white/5 flex-shrink-0">
                            {getFileIcon(file.mimeType)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate group-hover:text-pink-300 transition-colors">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-purple-300/60">
                              {file.createdTime ? new Date(file.createdTime).toLocaleDateString() : 'Drive File'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white text-xs transition-colors"
                              title="Open in Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => requestDelete(file)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs transition-colors cursor-pointer"
                            title="Delete file from Drive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Confirmation Modal for Deleting Drive Files (Workspace Rule Prerequisite) */}
        {confirmDeleteId && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-150">
            <div className="w-full max-w-sm glass-card border border-rose-500/30 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-century-gothic font-bold text-white text-base">
                Confirm Deletion
              </h4>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">"{fileToDeleteName}"</strong> from your Google Drive? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={loading}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors shadow-lg shadow-rose-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Deleting...' : 'Delete File'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-purple-950/40 border-t border-purple-500/20 text-center text-[11px] text-purple-300/60">
          Google Drive Integration active • Scopes: drive.readonly & drive.file
        </div>
      </div>
    </div>
  );
};
