const size = {
  h1: 28,
  h2: 22,
  h3: 18,
  h4: 16,
  medium: 14,
  small: 12,
  tiny: 10,
  tab: 8,
};

const style = {
  h1: {
    fontSize: size.h1,
    fontWeight: '800' as '800',
  },
  h2: {
    fontSize: size.h2,
    fontWeight: '600' as '600',
  },
  h3: {
    fontSize: size.h3,
    fontWeight: '600' as '600',
  },
  h4: {
    fontSize: size.h4,
    fontWeight: '600' as '600',
  },
  medium: {
    fontSize: size.medium,
  },
  bold: {
    fontWeight: '800' as '800',
  },
  semiBold: {
    fontWeight: '600' as '600',
  },
  small: {
    fontSize: size.small,
  },
  tiny: {
    fontSize: size.tiny,
  },
  smallBold: {
    fontSize: size.small,
    fontWeight: '800' as '800',
  },
  regularSemiBold: {
    fontSize: size.medium,
    fontWeight: '600' as '600',
  },
  smallMedium: {
    fontSize: size.small,
    fontWeight: '500' as '500',
  },
  smallSemiBold: {
    fontSize: size.small,
    fontWeight: '600' as '600',
  },
};

export default {
  size,
  style,
};
