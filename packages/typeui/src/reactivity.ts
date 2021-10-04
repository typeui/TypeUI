// see https://github.com/vuejs/vue-next/tree/master/packages/reactivity
// as reactivity package description:
// The standalone build should not be used alongside a pre-bundled build of a user-facing renderer, as they will have different internal storage for reactivity connections
//
// This file dynamic reexport user-facing renderer linked reactivity instance.

import {
	reactive as reactiveF,
	ref as refF,
	ToRef,
	UnwrapRef,
	Ref,
	UnwrapNestedRefs,
	ComputedRef,
	ComputedGetter,
	DebuggerOptions,
	WritableComputedOptions,
	WritableComputedRef,
	computed as computedF,
	effect as effectF,
	ReactiveEffectOptions,
	ReactiveEffectRunner,
} from '@vue/reactivity';

export {
	ToRef,
	UnwrapRef,
	Ref,
	UnwrapNestedRefs,
	ComputedRef,
	WritableComputedRef,
	WritableComputedOptions,
	ComputedGetter,
	DebuggerOptions,
};

export interface ReactivityProvider {
	reactive: typeof reactiveF;
	ref: typeof refF;
	computed: typeof computedF;
	effect: typeof effectF;
}

var glprovider: ReactivityProvider = undefined;

export function provide(provider: ReactivityProvider) {
	glprovider = provider;
}

export function reactive<T extends object>(target: T): UnwrapNestedRefs<T> {
	if (!glprovider) {
		throw new Error('call provide first');
	}

	return glprovider.reactive(target);
}

export function ref<T extends object>(value: T): ToRef<T>;
export function ref<T>(value: T): Ref<UnwrapRef<T>>;
export function ref<T = any>(): Ref<T | undefined>;

export function ref(value?: unknown) {
	if (!glprovider) {
		throw new Error('call provide first');
	}

	return glprovider.ref(value);
}

export function computed<T>(
	getter: ComputedGetter<T>,
	debugOptions?: DebuggerOptions,
): ComputedRef<T>;
export function computed<T>(
	options: WritableComputedOptions<T>,
	debugOptions?: DebuggerOptions,
): WritableComputedRef<T>;

export function computed<T>(getterOrOptions: any, debugOptions?: DebuggerOptions) {
	if (!glprovider) {
		throw new Error('call provide first');
	}

	return glprovider.computed(getterOrOptions, debugOptions);
}

export function effect<T = any>(
	fn: () => T,
	options?: ReactiveEffectOptions,
): ReactiveEffectRunner {
	if (!glprovider) {
		throw new Error('call provide first');
	}

	return glprovider.effect(fn, options);
}
