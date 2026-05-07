// src/components/forms/LoginForm.tsx (Personne 1 — Sprint A)

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginValues } from '../../types/authSchemas';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuthStore();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginValues) => {
    const result = login(values.email, values.password);
    if (result.success) {
      onSuccess();
    } else {
      setError('root', { message: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="jean@example.com"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
        />
        {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Mot de passe</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
        />
        {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
      </div>

      {errors.root && (
        <p className="text-xs text-rose-500 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-teal-500 text-white rounded-lg font-medium text-sm hover:bg-teal-600 transition disabled:opacity-50"
      >
        Se connecter
      </button>

      <p className="text-center text-sm text-slate-500">
        Pas encore de compte ?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-teal-600 font-medium hover:underline">
          S'inscrire
        </button>
      </p>
    </form>
  );
}
