import { Avatar, AvatarName } from '../types';

export const avatarList: { [key in AvatarName]: Avatar } = {
  fox: { icon: '\uD83E\uDD8A', color: '#ffc242' },
  pig: { icon: '\uD83D\uDC37', color: '#f4ccc7' },
  frog: { icon: '\uD83D\uDC38', color: '#8bf15d' },
  chicken: { icon: '\uD83D\uDC25', color: '#fffe60' },
  octopus: { icon: '\uD83D\uDC19', color: '#d74b67' },
  dolphin: { icon: '\uD83D\uDC2C', color: '#48c0e0' },
  owl: { icon: '\uD83E\uDD89', color: '#a06b39' },
  unicorn: { icon: '\uD83E\uDD84', color: '#ba72f8' },
};

// alternative
// export const avatarList2: Map<AvatarName, Avatar> = new Map([
//   ['fox', { icon: '\uD83E\uDD8A', color: '#ffc242' }],
//   ['pig', { icon: '\uD83D\uDC37', color: '#f4ccc7' }],
//   ['frog', { icon: '\uD83D\uDC38', color: '#8bf15d' }],
//   ['chicken', { icon: '\uD83D\uDC25', color: '#fffe60' }],
//   ['octopus', { icon: '\uD83D\uDC19', color: '#d74b67' }],
//   ['dolphin', { icon: '\uD83D\uDC2C', color: '#48c0e0' }],
//   ['owl', { icon: '\uD83E\uDD89', color: '#a06b39' }],
//   ['unicorn', { icon: '\uD83E\uDD84', color: '#ba72f8' }],
// ]);
