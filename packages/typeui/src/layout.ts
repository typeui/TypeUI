import { View } from './view';

export type VerticalAlignment = 'bottom' | 'center' | 'top';

export type Content = () => View;

/**
 * The HStack constructor
 */
export interface HStackConstructor {
	new (align: VerticalAlignment, content: Content): HStackView;
}

/**
 * HStack view protocol
 */
export interface HStackView extends View {}
