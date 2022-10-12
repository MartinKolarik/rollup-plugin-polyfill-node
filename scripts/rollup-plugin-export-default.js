// source: https://cdn.jsdelivr.net/npm/rollup-plugin-export-default@1.4.0/index.js
/**
 * @license MIT
 *
 * @fileoverview
 * A plugin which allows for the import of all named exports as the default
 * export for a Rollup output module.
 */

/**
 * If there is no `default` export, add an `export default { ... }` statement to
 * expose all named exports so that `import pkg from 'pkg'` imports all exports,
 * rather than needing to use `import * as pkg from 'pkg'`.
 *
 * @return {object} config
 */
const addDefaultExportStatement = () => {
  /**
   * Set to `true` if the module is non-ESM.
   *
   * @type {boolean}
   */
  let notESM = false;

  return {
    name: 'exportAllDefault',
    /**
     * If output.format not 'esm' or 'es', do not modify.
     *
     * @param {object} outputOptions
     * The output options for this bundle.
     *
     * @param {object} inputOptions
     * The input options for this bundle.
     *
     * @return {object} outputOptions
     * The modified output options.
     */
    renderStart: async (outputOptions, inputOptions) => {
      notESM = !['es', 'esm'].includes(outputOptions.format);
      return outputOptions;
    },
    /**
     * @param {string} code
     * The current bundle code.
     *
     * @param {object} chunk
     * The chunk data.
     *
     * @return {string} code
     * The modified code.
     */
    renderChunk: async (code, chunk) =>
      chunk.exports.includes('default') || notESM
        ? null
        : `${code}\nexport default { ${chunk.exports.join(', ')} };`,
  };
};

module.exports = addDefaultExportStatement;
