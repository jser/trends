existsDefault = require '..'
should       = require 'should'

describe 'existential default ::', ->

  describe 'behavior', ->

    it "don't modify input values", ->
      expected =
        foo: 'bar'
        hello: 'world'

      value1 = hello: 'world'
      value1Copy = hello: 'world'

      value2 = foo: 'bar'
      value2Copy = foo: 'bar'

      result = existsDefault(value2, value1)

      result.should.be.eql expected
      value1.should.be.eql value1Copy
      value2.should.be.eql value2Copy

    it 'works with one parameter', ->
      existsDefault('hello world').should.be.equal 'hello world'
      existsDefault(foo: 'bar').should.be.eql foo: 'bar'

    it 'works with more than one source', ->
      existsDefault('hello world', null, undefined).should.be.equal 'hello world'
      existsDefault(null, 'hello world', undefined).should.be.equal 'hello world'
      existsDefault(null, undefined, 'hello world').should.be.equal 'hello world'
      existsDefault('foo', 'hello world', 'bar').should.be.equal 'foo'

      expected = hello: 'world', foo: 'bar', pokemon: 'digimon'
      existsDefault({hello: 'world'}, {foo: 'bar'}, {pokemon: 'digimon'}).should.be.eql expected
      #
      expected = hello: 'bar', pokemon: 'digimon'
      existsDefault({hello: 'bar'}, {hello: 'world'}, {pokemon: 'digimon'}).should.be.eql expected

  describe 'non object', ->

    it 'resolve when not exists the value', ->
      existsDefault(null, 'hello world', ).should.eql 'hello world'
      existsDefault('hello world', 'foo', ).should.eql 'hello world'

  describe 'object', ->

    it 'added missing field', ->
      expected = hello: 'world', foo: 'bar'
      existsDefault({foo: 'bar'}, {hello: 'world'}).should.be.eql expected

    it  'dont overwrite a present field', ->
      expected = hello: 'world'
      existsDefault({hello: 'world'}, {hello: 'foo'}).should.be.eql expected

    it  'works with recursive object keys', ->
      defaults =
        one: 'one'
        two:
          three: 'three'
          five: 'five'

      objt =
        two: four: 'four'

      expected =
        one: 'one'
        two:
          three: 'three'
          four: 'four'
          five: 'five'

      existsDefault(objt, defaults).should.be.eql expected

      objt =
        two: 'two'

      expected =
        one: 'one'
        two: 'two'

      existsDefault(objt, defaults).should.be.eql expected
