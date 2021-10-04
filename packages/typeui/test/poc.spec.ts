import { should, use } from 'chai';

import {
	ref as refVue,
	effect as effectVue,
	reactive as reactiveVue,
	computed as computedVue,
} from '@vue/reactivity';

import { Ref, ref, effect, provide, computed } from '../src/reactivity';

use(require('chai-as-promised'));

should();

class Hello {
	private _counter: Ref<number>;

	private _c: Ref<number>;

	constructor(counter: Ref<number>, c: Ref<number>) {
		this._counter = counter;
		this._c = c;
	}

	async body(): Promise<string> {
		return `hello ${this._counter.value} ${this._c.value}`;
	}
}

describe('typeof test', async () => {
	before(async () => {
		provide({
			reactive: reactiveVue,
			computed: computedVue,
			effect: effectVue,
			ref: refVue,
		});
	});

	it('typeof func', () => {
		const counter = ref(0);

		const c = computed(() => counter.value + 1);

		const hello = new Hello(counter, c);

		const run = effect(
			async () => {
				console.log('====', await hello.body());
			},
			{ lazy: true },
		);

		counter.value++;

		run();

		run.effect.stop();

		counter.value++;

		run();
	});
});
