import { mask } from '../task';

test('masks all characters expect first and last', () => {
    expect(mask("Aeroplane")).toBe("A$$$$$$$e");
});

test('does not mask ending symbols', () => {
    expect(mask("Ending.")).toBe("E$$$$g.");
});