const delayResolve = (value, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), timeout)
  });
};

export function getAccountData() {
  return delayResolve({
    account: {
      login: 'Tim',
      avatarURL: 'https://pp.userapi.com/c638624/v638624890/4f427/gizTR-4andk.jpg',
      following: [
        { login: 'Fjsk' },
        { login: 'Gjee' }
      ],
      followers: [
        { login: 'bd' },
        { login: 'asas' },
        { login: 'kiee' },
        { login: 'wertrt' },
      ]
    }
  }, 1300);
}

export function getRequests() {
  return delayResolve({
    requests: [
      { login: 'Gosha' },
      { login: 'Rusya' },
      { login: 'asas' },
      { login: 'kiee' },
    ]
  }, 1100);
}

export function getHistory() {
  return delayResolve({
    history: [
      { login: 'wertrt', action: 'follow' },
    ]
  }, 1300);
}

export function getAccounts() {
  return delayResolve({
    accounts: [
      { login: 'Gosha', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'Rusya', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'kiee', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'bd', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'asas', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'qwwwqwq', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'ffff', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' },
      { login: 'wertrt', avatarURL: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/user-man-circle-invert-512.png' }
    ]
  }, 1500);
}
