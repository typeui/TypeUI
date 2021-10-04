import { reactive as reactiveF, ref as refF, ToRef, UnwrapRef, Ref, UnwrapNestedRefs, ComputedRef, ComputedGetter, DebuggerOptions, WritableComputedOptions, WritableComputedRef, computed as computedF } from '@vue/reactivity';
export { ToRef, UnwrapRef, Ref, UnwrapNestedRefs };
export interface ReactivityProvider {
    reactive: typeof reactiveF;
    ref: typeof refF;
    computed: typeof computedF;
}
export declare function provide(provider: ReactivityProvider): void;
export declare function reactive<T extends object>(target: T): UnwrapNestedRefs<T>;
export declare function ref<T extends object>(value: T): ToRef<T>;
export declare function ref<T>(value: T): Ref<UnwrapRef<T>>;
export declare function ref<T = any>(): Ref<T | undefined>;
export declare function computed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>;
export declare function computed<T>(options: WritableComputedOptions<T>, debugOptions?: DebuggerOptions): WritableComputedRef<T>;
