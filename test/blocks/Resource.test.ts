import { Resource, map } from '../../src';
import { arg4 } from '..';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toTerraform('0.12')).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toBe('type.name');
  expect(resource.getAttribute('attr').toTerraform()).toBe('type.name.attr');
});

describe('toDataSource', () => {

  const resource = new Resource('type', 'name', {
    arg: 'arg',
    tags: map({
      a: 'a',
      b: 'b'
    })
  });

  test('OK', () => {
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }]
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }]
    }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }]
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }]
    }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args', () => {
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { a: 'a' }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { a: 'a' }
    }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { a: 'a' }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { a: 'a' }
    }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args overwrite', () => {
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { arg: 'a' }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { arg: 'a' }
    }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { arg: 'a' }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { arg: 'a' }
    }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args with filter', () => {
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: [] }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: [] }
    }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: [] }
    }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toDataSource({
      name: 'newName', argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: [] }
    }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args invalid filter', () => {
    expect(() => resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: 'a' }
    })).toThrow();
    expect(() => resource.toDataSource({
      argNames: ['arg', { name: 'tags', newName: 'tag' }], args: { filter: 'a' }
    })).toThrow();
  });

});
