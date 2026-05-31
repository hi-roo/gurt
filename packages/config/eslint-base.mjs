// Geteilte ESLint-Basis (Flat Config) für alle Gurt-Packages.
// Schicht-spezifische Configs importieren diese Basis und ergänzen ggf. Regeln.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.next/**',
      '.turbo/**',
      'coverage/**',
      'node_modules/**',
      '**/*.d.ts',
      'sanity.types.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
  prettier,
);
