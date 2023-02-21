import * as core from '@actions/core';
import {run} from '../src/main'
import {jest ,expect, test, describe, it, beforeEach} from '@jest/globals'


// mock the core functions
jest.mock('@actions/core');
const mockedCore = core as jest.Mocked<typeof core>;

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('generates a password with default options', async () => {
    // set the inputs for the action
    mockedCore.getInput.mockImplementation((name: string, options?: core.InputOptions) => {
      if (name === 'min-length') return '12';
      if (name === 'max-length') return '12';
      if (name === 'use-special-chars') return 'false';
      if (name === 'debug') return 'false';
      throw new Error(`Unknown input name: ${name}`);
    });

    await run();

    expect(mockedCore.setSecret).toHaveBeenCalledWith(expect.any(String));
    expect(mockedCore.setOutput).toHaveBeenCalledWith('password', expect.any(String));
  });

  it('generates a password with special characters', async () => {
    // set the inputs for the action
    mockedCore.getInput.mockImplementation((name: string, options?: core.InputOptions) => {
      if (name === 'min-length') return '12';
      if (name === 'max-length') return '12';
      if (name === 'use-special-chars') return 'true';
      if (name === 'debug') return 'false';
      throw new Error(`Unknown input name: ${name}`);
    });

    await run();

    expect(mockedCore.setSecret).toHaveBeenCalledWith(expect.any(String));
    expect(mockedCore.setOutput).toHaveBeenCalledWith('password', expect.any(String));
  });

  it('throws an error for missing inputs', async () => {
    // set the inputs for the action
    mockedCore.getInput.mockImplementation((name: string, options?: core.InputOptions) => {
      throw new Error(`Missing input: ${name}`);
    });

    await run();

    expect(mockedCore.setFailed).toHaveBeenCalledWith(expect.any(String));
  });




  it('sets the action output', async () => {

    mockedCore.getInput.mockImplementation((name: string, options?: core.InputOptions) => {
      if (name === 'min-length') return '12';
      if (name === 'max-length') return '12';
      if (name === 'use-special-chars') return 'true';
      if (name === 'debug') return 'false';
      throw new Error(`Unknown input name: ${name}`);
    });


    const setOutputMock = jest.spyOn(mockedCore, 'setOutput')
    await run()
    expect(setOutputMock).toHaveBeenCalledWith('password',expect.any(String)    )
  });

});





// import {generateRandomPassword} from '../src/randompassword'
// import * as process from 'process'
// import * as cp from 'child_process'
// import * as path from 'path'
// import {expect, test} from '@jest/globals'


//   test('generates a password with default options', () => {
//     const password = generateRandomPassword(15,17);
//     console.log(password)
//     expect(password).toMatch(/^[a-zA-Z0-9]/);
//   })

//   test('generates a password with specified length', () => {
//     const password = generateRandomPassword(20,20);
//     console.log(password)
//     expect(password).toHaveLength(20);
//   })

//   test('generates a password with special characters', () => {
//     const password = generateRandomPassword(12, 12, true);
//     console.log(password)
//     expect(password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+\-={}[\]|;:,.<>?/~]{12}$/);
//   });


