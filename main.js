const { localFileSystem, errors } = require("uxp").storage;

async function createFile() {
  const folder = await localFileSystem.getFolder();
  if (!folder) throw new Error("errorNoFolder");

  try {
    const file = await folder.createFile("test-file.txt", {
      overwrite: false
    });
    return await file.write("some stuff");
  } catch (err) {
    console.log(err);
    console.log(err instanceof errors.EntryExistsError);
    console.log(err instanceof errors.FileIsReadOnlyError);
    console.log(err instanceof errors.PermissionDeniedError);
  }
}

module.exports = {
  commands: {
    myPluginCommand: createFile
  }
};
