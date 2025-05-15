import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    setLoading(true);

    try {
      // Aquí iría la lógica para autenticar al usuario
      // Ejemplo: await loginUser(email, password);
      console.log('Login con:', { email, password });

      // Simular éxito después de 1.5 seg
      await new Promise(res => setTimeout(res, 1500));

      alert('Login exitoso!');
    } catch (e) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
            minLength={6}
          />
        </div>

        {error && (
          <div style={{ marginBottom: '1rem', color: 'red' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ padding: '10px 20px', width: '100%' }}>
          {loading ? 'Iniciando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
