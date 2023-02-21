import * as core from '@actions/core'
import {generateRandomPassword} from './randompassword'

export async function run(): Promise<void> {

  try {
    const minLength = Number(core.getInput('min-length', { required: true }));
    const maxLength = Number(core.getInput('max-length', { required: true }));
    const useSpecialChars = core.getInput('use-special-chars') === 'true';
    const debug = core.getInput('debug') === 'true';

    const password = generateRandomPassword(minLength, maxLength, useSpecialChars);
    if(!debug){
      core.setSecret(password); // mask the password in the logs
    }
    core.setOutput('password', password);
    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
