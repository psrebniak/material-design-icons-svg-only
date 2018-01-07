const FileHound = require('filehound');
const FsExtra = require('fs-extra');
const Path = require('path');

const Categories = [
    'action',
    'alert',
    'av',
    'communication',
    'content',
    'device',
    'editor',
    'file',
    'hardware',
    'image',
    'maps',
    'navigation',
    'notification',
    'places',
    'social',
    'toggle'
];
const BuildDirectory = __dirname + '/dist/';

FsExtra.emptyDirSync(BuildDirectory);

Categories.forEach((category) => {
    const CategoryDirectory = BuildDirectory + category;
    FsExtra.emptyDirSync(CategoryDirectory);

    const files = FileHound.create()
        .paths(__dirname + '/node_modules/material-design-icons/' + category)
        .ext('svg')
        .match('*_48px.svg')
        .find();

    files.then((filesArray) => {
        filesArray.forEach((file) => {
            const filename = Path.basename(file).replace(/^ic_/, '').replace(/_48px.svg$/, '.svg');
            FsExtra.copySync(file, CategoryDirectory + '/' + filename);
        });
    })
});


