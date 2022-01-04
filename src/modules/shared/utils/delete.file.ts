import { promises } from 'fs';
import * as fs from 'fs';


export async function deleteFile(source: string): Promise<void> {

  try {
  //  await promises.access(source, fs.constants.F_OK);
    await promises.unlink(source);
  } catch (error) {
  //  throw error;

  }

  // return promises.rename(source, destination)
  //   .then(() => {/* Handle success */
  //   })
  //   .catch((error) => {/* Handle failure */
  //     console.log(error);
  //   });


}
