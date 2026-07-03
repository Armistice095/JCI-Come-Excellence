const ICONS = {
  leaf: '<path d="M21 3c0 9-6 15-15 15H4v-2c0-9 6-15 15-15h2v2z"/><path d="M9 17c2-4 5-7 11-9"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 17.5 4 4.5 4.5 0 0 0 12 7a4.5 4.5 0 0 0-5.5-3A4.5 4.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  recycle: '<path d="M7 19H4a2 2 0 0 1-1.7-3l4-6.7"/><path d="M11 19h9.4a2 2 0 0 0 1.7-3L18 9"/><path d="M9.5 2.5 13 6l-3.5 3.5"/><path d="M6 12 2.5 6 9 2"/><path d="M14.5 9.5 18 13l3.5-3.5"/>',
  "device-laptop": '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M2 18.5h20"/>',
  "map-pin": '<path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><path d="M16 6.5a3.2 3.2 0 0 1 0 6.3"/><path d="M22 19.5c0-3-2.4-5-5.5-5.6"/>',
  flag: '<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
  award: '<circle cx="12" cy="8" r="5.5"/><path d="M9 13.5 7 21l5-3 5 3-2-7.5"/>'
};

function icon(name, size) {
  size = size || 24;
  const paths = ICONS[name] || ICONS["arrow-right"];
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
}
