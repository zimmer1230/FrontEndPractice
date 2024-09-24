import fs from 'fs';

// Read your Vue component file
const vueFilePath = './src/components/Books.vue'; // specify the path to your Vue file
const vueFileContent = fs.readFileSync(vueFilePath, 'utf-8');

// Function to refactor variables into ref() and update their usage
function refactorToRef(content) {
  // 1. Find variable declarations and convert them to ref()
  let refContent = content.replace(/let\s+(\w+)\s+=\s+([^;]+);/g, (match, varName, value) => {
    return `let ${varName} = ref(${value.trim()});`;
  });

  // 2. Update all usages of variables to use `.value`
  // This regex will find all instances of the variable name outside of declarations and method names
  const varNames = [...refContent.matchAll(/let\s+(\w+)\s+=/g)].map(match => match[1]);
  varNames.forEach(varName => {
    const usageRegex = new RegExp(`(?<!let\\s|const\\s|var\\s|function\\s)\\b${varName}\\b(?!\\.value)`, 'g');
    refContent = refContent.replace(usageRegex, `${varName}.value`);
  });

  return refContent;
}

// Refactor the content of the Vue file
const updatedVueFileContent = refactorToRef(vueFileContent);

// Save the updated content back to the file or another file
const outputFilePath = './UpdatedComponent.vue'; // specify where to save the updated Vue file
fs.writeFileSync(outputFilePath, updatedVueFileContent, 'utf-8');

console.log('Vue file has been refactored with ref()!');
