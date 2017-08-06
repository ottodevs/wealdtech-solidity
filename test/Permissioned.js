'use strict';

const assertJump = require('./helpers/assertJump');
const PermissionedTest1 = artifacts.require('samplecontracts/PermissionedTest1.sol');

const PERMS_SET_INT = 2;
const PERMS_SET_BOOL = 3;

contract('Permissioned', accounts => {
  it('cannot access a method without permission', async function() {
    const Permissioned = await PermissionedTest1.new();
    try {
        await Permissioned.setBool(true);
    } catch(error) {
        assertJump(error);
    }
  });

  it('can access a method with permission', async function() {
    const Permissioned = await PermissionedTest1.new();
    await Permissioned.setPermission(accounts[0], PERMS_SET_BOOL, true);
    await Permissioned.setBool(true);
  });

  it('does not leak permissions across accounts', async function() {
    const Permissioned = await PermissionedTest1.new();
    try {
        await Permissioned.setBool(true, {from: accounts[1]});
    } catch(error) {
        assertJump(error);
    }
  });

  it('does not leak permissions across permission IDs', async function() {
    const Permissioned = await PermissionedTest1.new();
    try {
        await Permissioned.setInt(1);
    } catch(error) {
        assertJump(error);
    }
  });

  it('can have permissions revoked', async function() {
    const Permissioned = await PermissionedTest1.new();
    await Permissioned.setPermission(accounts[0], PERMS_SET_BOOL, false);
    try {
        await Permissioned.setBool(true);
    } catch(error) {
        assertJump(error);
    }
  });

  it('does not allow permissions to be set by an unauthorised user', async function() {
    const Permissioned = await PermissionedTest1.new();
    try {
        await Permissioned.setPermission(accounts[0], PERMS_SET_BOOL, true, {from: accounts[1]});
    } catch(error) {
        assertJump(error);
    }
  });
});