import initials from 'initials';

export const abbr = (name, noUpperCase) => {
  let abbr = initials(name);
  if (!abbr) {
    console.warn('Could not get abbr from name');
    abbr = name;
  }
  if (abbr.length > 2) {
    abbr = abbr.substring(0, 2);
  }
  if (!noUpperCase) {
    abbr = abbr.toUpperCase();
  }
  return abbr;
};

export const sumChars = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
};

export const fetchImage = async (src, options) => {
  try {
    const fetchCall = await fetch(src, options);
    if (fetchCall.headers.map['content-type'].startsWith('image/')) {
      return true;
    } else {
      console.warn('Online fetched source is not a supported image');
      return false;
    }
  } catch (err) {
    console.warn('Error fetching source, falling back to initials', err);
    return false;
  }
};

export const generateBackgroundStyle = (name, bgColor, bgColors) => {
  let background;
  if (bgColor) {
    background = bgColor;
  } else {
    // Pick a deterministic color from the list
    const i = sumChars(name) % bgColors.length;
    background = bgColors[i];
  }
  return {backgroundColor: background};
};

export const generateBackgroundColor = (name, bgColor, bgColors) => {
  let background;
  if (bgColor) {
    background = bgColor;
  } else {
    // Pick a deterministic color from the list
    const i = sumChars(name) % bgColors.length;
    background = bgColors[i];
  }
  return background;
};

export const getContainerStyle = (size, src, borderRadius) => {
  return {
    borderRadius: borderRadius ? borderRadius : (size * 0.5),
    borderWidth: src ? 0 : 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  };
};
