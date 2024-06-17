import { theme } from './Theme';

describe('Theme', () => {
  it('should have defined colors', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.primary).toEqual('#305C9D');
    expect(theme.colors.secondary).toEqual('#293C57');
  });

  it('should have defined fonts', () => {
    expect(theme.fonts).toBeDefined();
    expect(theme.fonts.familySans).toEqual('Open Sans');
    expect(theme.fonts.weights).toEqual({
      light: '200',
      normal: '400',
      medium: '500',
      bold: '600',
      extraBold: '700',
    });
  });

  it('should have defined shadows', () => {
    expect(theme.shadows).toBeDefined();
    expect(theme.shadows.cardShadow).toEqual(
      '0px 10px 10px 2px rgba(48, 92, 157, 0.05), 0px 2px 5px 0px rgba(48, 92, 157, 0.19), 0px 0px 2px 0px rgba(48, 92, 157, 0.11) inset;'
    );
  });

  it('should have defined sizes', () => {
    expect(theme.sizes).toBeDefined();
    expect(theme.sizes.sm).toEqual('320px');
    expect(theme.sizes.md).toEqual('375px');
    expect(theme.sizes.lg).toEqual('425px');
    expect(theme.sizes.tablet).toEqual('600px');
  });
});
