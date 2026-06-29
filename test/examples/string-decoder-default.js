import stringDecoder, {StringDecoder} from 'string_decoder';

if (typeof stringDecoder.StringDecoder !== 'function') {
  done(new Error('default string_decoder export should include StringDecoder'));
} else if (stringDecoder.StringDecoder !== StringDecoder) {
  done(new Error('default and named StringDecoder exports should match'));
} else {
  done();
}
