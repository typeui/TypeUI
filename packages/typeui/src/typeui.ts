import { effect, ReactiveEffectRunner } from '.';

// Render target platform
export type Platform = 'web' | 'desktop' | 'android' | 'iOS';

// Render components entry
export type Plugin = (typeui: TypeUI) => void;

export interface View {
	render(typeui: TypeUI): void;
}

/**
 * View projection interface
 */
export interface ViewProjection {
	readonly render: string;
}
/**
 * The view projection render function
 */
export type viewRender = (view: ViewProjection) => void;

// App enter point
export class TypeUI {
	private _runner: ReactiveEffectRunner;

	constructor(view: View) {
		this._runner = effect(
			() => {
				view.render(this);
			},
			{ lazy: true },
		);
	}
	/**
	 * Apply plugin
	 * @param plugin plugin entry function
	 * @returns current TypeUI object
	 */
	public use(plugin: Plugin): this {
		plugin(this);
		return this;
	}

	/**
	 *
	 * @param name render key name
	 * @param render render function
	 * @param platform render target plaform
	 * @returns current TypeUI object
	 */
	public render(name: string, render: viewRender, platform: Platform): this {
		return this;
	}
}

/**
 * Create new typeui app with provide root view
 * @param view root view
 * @returns typeui instance
 */
export function createApp(view: View): TypeUI {
	return new TypeUI(view);
}
