# jhipster-mongodb-sample-projects

Sample projects generated to test/develop support in JHipster for relations/embedded entities with mongodb.

You can try it by cloning and linking jhipster generator and importing a jdl...

## Cloning and linking a local version that supports relations in mongodb
```bash
mkdir jhipster-mongodb-sample-projects && cd jhipster-mongodb-sample-projects
git clone https://github.com/ivangsa/jhipster-core.git
git clone https://github.com/ivangsa/generator-jhipster.git
cd jhipster-core
git co mongodb-with-relations-feature-request
yarn link
cd ../generator-jhipster
git co mongodb-with-relations-feature-request
yarn link
cd ..
```

## generating a project using local versions
```bash
# generating a project using local versions
mkdir jhipster-mongodb-with-relations && cd jhipster-mongodb-with-relations
yarn link jhipster-core && yarn link generator-jhipster
node_modules/generator-jhipster/cli/jhipster.js
# importing jdl/s
# you can find some tested examples at https://github.com/ivangsa/jhipster-mongodb-sample-projects/tree/master/models-jdl
node_modules/generator-jhipster/cli/jhipster.js import-jdl ../models-jdl/orders-model.jdl ../models-jdl/with-dto-options.jdl
```
Please, try it!

If you find a jdl model that doesn't work, please send us the jdl + .yo-rc.json so we can work on fixing it
