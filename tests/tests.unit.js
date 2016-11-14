

'use strict';

const chai = require('chai');

const expect    = chai.expect;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const VoteCollector = require('../VoteCollector');


describe('Collect from result', () =>{

    it('Vote only for "a"',  (done) =>{
        let res = VoteCollector.collectVotesFromResult({
            rows: [
                {
                    vote: 'a',
                    count: '12'
                }
            ]
        });
        expect(res.a).to.equal(12);
        expect(res.b).to.equal(0);
        done();

    });


    it('Vote only for "b"',  (done) =>{
        var res = VoteCollector.collectVotesFromResult({
            rows: [
                {
                    vote: 'b',
                    count: '12'
                }
            ]
        });
        expect(res.a).to.equal(0);
        expect(res.b).to.equal(12);
        done();

    });

    it('No vote',  (done) =>{
        var res = VoteCollector.collectVotesFromResult({
            rows: [

            ]
        });
        expect(res.a).to.equal(0);
        expect(res.b).to.equal(0);
        done();

    });

    it('No vote with different properties',  (done) =>{
        var res = VoteCollector.collectVotesFromResult({
            rows: [
                {
                    vote: 'C',
                    count: '12'
                }
            ]
        });
        expect(res.a).to.equal(0);
        expect(res.b).to.equal(0);
        done();

    });

    it('vote to two parties',  (done) =>{
        var res = VoteCollector.collectVotesFromResult({
            rows: [
                {
                    vote: 'a',
                    count: '1'
                },
                {
                    vote: 'b',
                    count: '2'
                }
            ]
        });
        expect(res.a).to.equal(1);
        expect(res.b).to.equal(2);
        done();

    });

    it('vote to two parties',  (done) =>{
        try{
            VoteCollector.collectVotesFromResult();
            done(new Error('Validation should have failed'));
        }catch(e){
            console.log(JSON.stringify(e));
            expect(e.name).to.contain('TypeError');
            done();
        }

    });
});
