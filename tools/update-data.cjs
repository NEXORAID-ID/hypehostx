const fs = require('node:fs');
const pairs = {
  favorites: ['Favorites only', 'Hanya favorit'],
  favorite: ['Add favorite', 'Tambah favorit'],
  unfavorite: ['Remove favorite', 'Hapus favorit'],
  documentation: [
    'Upstream documentation only; no downloadable component or verified support.',
    'Hanya dokumentasi upstream; tanpa komponen unduhan atau dukungan terverifikasi.'
  ],
  searchComponents: ['Search documentation', 'Cari dokumentasi'],
  emptyComponents: ['No matching documentation.', 'Tidak ada dokumentasi cocok.']
};
for (const [lang, index] of [
  ['en', 0],
  ['id', 1]
]) {
  const path = 'src/locales/' + lang + '.json',
    data = JSON.parse(fs.readFileSync(path));
  for (const [k, v] of Object.entries(pairs)) data[k] = v[index];
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
fs.writeFileSync(
  'src/data/components.json',
  JSON.stringify(
    {
      schemaVersion: 1,
      components: [
        {
          id: 'goldhen-docs',
          name: 'GoldHEN',
          sourceUrl: 'https://github.com/GoldHEN/GoldHEN',
          distributionStatus: 'link-only',
          rightsStatus: 'owner_reported_scope_unverified'
        },
        {
          id: 'openorbis-docs',
          name: 'OpenOrbis PS4 Toolchain',
          sourceUrl: 'https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain',
          distributionStatus: 'link-only',
          rightsStatus: 'review_required'
        },
        {
          id: 'mira-docs',
          name: 'Mira Project',
          sourceUrl: 'https://github.com/OpenOrbis/mira-project',
          distributionStatus: 'link-only',
          rightsStatus: 'review_required'
        }
      ]
    },
    null,
    2
  ) + '\n'
);
