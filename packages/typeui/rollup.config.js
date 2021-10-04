import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/cjs/index.js',
			format: 'cjs',
		},
		plugins: [typescript({ tsconfig: './tsconfig.json' })],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/esm/index.js',
			format: 'es',
		},
		plugins: [typescript({ tsconfig: './tsconfig.json' })],
	},
];
