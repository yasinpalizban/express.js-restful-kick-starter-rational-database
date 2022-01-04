import { promises } from 'fs';

export async function moveFile(source: string, destination: string):Promise<void> {

  try {
    // 2. Rename the file (move it to the new directory)
    await promises.rename(source, destination);
  } catch (error) {
    if (error.code === 'EXDEV') {
      // 3. Copy the file as a fallback
      await promises.copyFile(source, destination);
      // Remove the old file
      await promises.unlink(source);
    } else {
      // Throw any other error
      throw error;
    }
  }

  // return promises.rename(source, destination)
  //   .then(() => {/* Handle success */
  //   })
  //   .catch((error) => {/* Handle failure */
  //     console.log(error);
  //   });


}
