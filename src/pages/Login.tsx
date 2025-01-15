import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { setUser } from '../lib/store/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store/store';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(setUser(userCredential.user));
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in with email and password', error);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            dispatch(setUser({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified ?? false,
            }));

            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg:white dark:bg-black">
            <div className="absolute inset-0" />
            <div className="absolute inset-0 bg:white dark:bg-black" />
            <div className="relative w-full max-w-md p-8 mx-4 animate-fade-in">
                <div className="p-8 glass rounded-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
                    </div>
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 transition-all bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/10 focus:border-white/30 dark:focus:border-white/20"
                                    placeholder="Enter your email"
                                />
                                <Mail className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 pr-10 transition-all bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/10 focus:border-white/30 dark:focus:border-white/20"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute text-gray-400 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-600 rounded dark:text-gray-400 bg-white/50 dark:bg-white/5">Or continue with</span>
                        </div>
                    </div>
                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full mt-6 transition-all duration-200 bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign In with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}