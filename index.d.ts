export interface PlainSfcOptions {
    /**
     * The location of the global CSS file that concatenates all the styles.
     */
    globalCssFile: string;
    /**
     * Optionally you can prevent the compiler from compiling the HTML.
     * This option will add the template property to your component instead of directly assigning the render function.
     * Note: This doesn't work with <script setup> or <style module>
     */
    useRawTemplate?: boolean;
    /**
     * You can also minify the compiled module code to save space for production use.
     */
    minify?: boolean;
}

/**
 * This function will search for .vue files inside your source path and compiles them to JavaScript files that are saved under the destination path.
 */
export declare function compileSFCs(sourcePath: string, destinationPath: string, options: PlainSfcOptions): Promise<void>;