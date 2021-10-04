/**
 * The type ui view element protocol
 */
export interface View {
	body(): Promise<View>;
}
