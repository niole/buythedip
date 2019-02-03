## generate api

```
brew install protobuf
export OUT_DIR=./api/client/; protoc ./api/apiDefinitions/*.proto --js_out=import_style=typescript:$OUT_DIR
```
