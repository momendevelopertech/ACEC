const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app', '[locale]');

// Recursively find all tsx files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findTsxFiles(srcDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Simple layout replacements
  content = content.replace(/style=\{\{\s*paddingTop:\s*["']80px["'],?\s*\}\}/g, 'className="pt-[80px]"');
  content = content.replace(/style=\{\{\s*paddingTop:\s*["']80px["'],\s*minHeight:\s*["']100vh["']\s*\}\}/g, 'className="pt-[80px] min-h-screen"');
  content = content.replace(/style=\{\{\s*paddingTop:\s*["']6rem["'],?\s*\}\}/g, 'className="pt-24"');
  content = content.replace(/style=\{\{\s*padding:\s*["']4rem 1\.5rem 6rem["'],?\s*\}\}/g, 'className="py-16 px-6 md:pb-24"');
  content = content.replace(/style=\{\{\s*padding:\s*["']3rem 1\.5rem["'],?\s*\}\}/g, 'className="py-12 px-6"');
  content = content.replace(/style=\{\{\s*padding:\s*["']6rem 1\.5rem["'],?\s*\}\}/g, 'className="py-24 px-6"');
  content = content.replace(/style=\{\{\s*padding:\s*["']4rem 0["'],?\s*\}\}/g, 'className="py-16"');
  content = content.replace(/style=\{\{\s*padding:\s*["']3rem["'],?\s*\}\}/g, 'className="p-12"');
  content = content.replace(/style=\{\{\s*padding:\s*["']1\.5rem["'],?\s*\}\}/g, 'className="p-6"');

  content = content.replace(/style=\{\{\s*maxWidth:\s*["']800px["'],?\s*\}\}/g, 'className="max-w-[800px] mx-auto"');
  content = content.replace(/style=\{\{\s*maxWidth:\s*["']900px["'],?\s*\}\}/g, 'className="max-w-[900px] mx-auto"');
  content = content.replace(/style=\{\{\s*maxWidth:\s*["']1000px["'],?\s*\}\}/g, 'className="max-w-[1000px] mx-auto"');
  content = content.replace(/style=\{\{\s*maxWidth:\s*["']1200px["'],?\s*\}\}/g, 'className="max-w-[1200px] mx-auto"');

  content = content.replace(/style=\{\{\s*textAlign:\s*["']center["'],\s*marginTop:\s*["']3rem["'],?\s*\}\}/g, 'className="text-center mt-12"');
  content = content.replace(/style=\{\{\s*textAlign:\s*["']center["'],\s*padding:\s*["']3rem["'],?\s*\}\}/g, 'className="text-center p-12"');
  content = content.replace(/style=\{\{\s*textAlign:\s*["']center["'],\s*padding:\s*["']4rem 0["'],?\s*\}\}/g, 'className="text-center py-16"');

  content = content.replace(/style=\{\{\s*justifyContent:\s*["']center["'],\s*marginBottom:\s*["']1rem["'],?\s*\}\}/g, 'className="justify-center mb-4"');
  content = content.replace(/style=\{\{\s*marginBottom:\s*["']1rem["'],\s*justifyContent:\s*["']center["'],?\s*\}\}/g, 'className="justify-center mb-4"');

  // Flex layouts
  content = content.replace(/style=\{\{\s*display:\s*["']flex["'],\s*gap:\s*["']1\.5rem["'],?\s*\}\}/g, 'className="flex gap-6"');
  content = content.replace(/style=\{\{\s*display:\s*["']flex["'],\s*gap:\s*["']0\.75rem["'],\s*flexWrap:\s*["']wrap["'],?\s*\}\}/g, 'className="flex gap-3 flex-wrap"');
  content = content.replace(/style=\{\{\s*display:\s*["']flex["'],\s*gap:\s*["']1rem["'],\s*flexWrap:\s*["']wrap["'],?\s*\}\}/g, 'className="flex gap-4 flex-wrap"');
  content = content.replace(/style=\{\{\s*display:\s*["']flex["'],\s*flexDirection:\s*["']column["'],\s*gap:\s*["']1\.5rem["'],?\s*\}\}/g, 'className="flex flex-col gap-6"');
  content = content.replace(/style=\{\{\s*display:\s*["']flex["'],\s*flexDirection:\s*["']column["'],\s*gap:\s*["']1rem["'],?\s*\}\}/g, 'className="flex flex-col gap-4"');

  // Grid
  content = content.replace(/style=\{\{\s*display:\s*["']grid["'],\s*gap:\s*["']1\.5rem["'],\s*gridTemplateColumns:\s*["']repeat\(auto-fit, minmax\(300px, 1fr\)\)["'],?\s*\}\}/g, 'className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"');
  content = content.replace(/style=\{\{\s*display:\s*["']grid["'],\s*gap:\s*["']2rem["'],\s*gridTemplateColumns:\s*["']repeat\(auto-fit, minmax\(350px, 1fr\)\)["'],?\s*\}\}/g, 'className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]"');

  // Images
  content = content.replace(/style=\{\{\s*width:\s*["']100%["'],\s*height:\s*["']100%["'],\s*objectFit:\s*["']cover["'],?\s*\}\}/g, 'className="w-full h-full object-cover"');

  // Text colors
  content = content.replace(/style=\{\{\s*color:\s*["']var\(--color-muted\)["'],?\s*\}\}/g, 'className="text-text-muted"');
  content = content.replace(/style=\{\{\s*color:\s*["']var\(--color-text-muted\)["'],?\s*\}\}/g, 'className="text-text-muted"');
  content = content.replace(/style=\{\{\s*color:\s*["']var\(--color-gold\)["'],?\s*\}\}/g, 'className="text-accent"');
  content = content.replace(/style=\{\{\s*color:\s*["']var\(--color-text\)["'],?\s*\}\}/g, 'className="text-text-primary"');
  content = content.replace(/style=\{\{\s*fontSize:\s*["']1\.2rem["'],\s*color:\s*["']var\(--color-muted\)["'],?\s*\}\}/g, 'className="text-xl text-text-muted"');
  content = content.replace(/style=\{\{\s*color:\s*["']var\(--color-muted\)["'],\s*fontSize:\s*["']0\.9rem["'],?\s*\}\}/g, 'className="text-sm text-text-muted"');

  // Background colors & borders
  content = content.replace(/style=\{\{\s*background:\s*["']var\(--color-surface\)["'],\s*border:\s*["']1px solid var\(--color-border\)["'],\s*borderRadius:\s*["']var\(--radius-lg\)["'],\s*overflow:\s*["']hidden["'],?\s*\}\}/g, 'className="bg-surface border border-border-default rounded-2xl overflow-hidden"');
  content = content.replace(/style=\{\{\s*background:\s*["']var\(--color-surface\)["'],\s*border:\s*["']1px solid var\(--color-border\)["'],\s*borderRadius:\s*["']var\(--radius-lg\)["'],\s*padding:\s*["']2rem["'],?\s*\}\}/g, 'className="bg-surface border border-border-default rounded-2xl p-8"');

  // className merging (if a className already exists in the same line/element, this regex might be naive, but it's a start)
  // We'll run this to get 80% of the easy ones out of the way, then review the diff.
  
  // Transform <div className="section-label" className="justify-center mb-4"> to <div className="section-label justify-center mb-4">
  content = content.replace(/className=(["'][^"']+["'])\s+className=(["'][^"']+["'])/g, (match, p1, p2) => {
    return `className="${p1.slice(1, -1)} ${p2.slice(1, -1)}"`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
