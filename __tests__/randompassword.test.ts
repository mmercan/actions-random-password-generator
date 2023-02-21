import {generateRandomPassword} from '../src/randompassword'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'


  test('generates a password with default options', () => {
    const password = generateRandomPassword(15,17);
    console.log(password)
    expect(password).toMatch(/^[a-zA-Z0-9]/);
  })

  test('generates a password with specified length', () => {
    const password = generateRandomPassword(20,20);
    console.log(password)
    expect(password).toHaveLength(20);
  })

  test('generates a password with special characters', () => {
    const password = generateRandomPassword(12, 12, true);
    console.log(password)
    expect(password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+\-={}[\]|;:,.<>?/~]{12}$/);
  });




// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10)
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   console.log("matttt mattt");
//   expect(delta).toBeGreaterThan(450)
// })

// // shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env['INPUT_MILLISECONDS'] = '500'
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })
