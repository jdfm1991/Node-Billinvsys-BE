import sharp from "sharp";

export const resizeImage = (filePath, fileName, size = 300) => {
    return sharp(filePath)
    .resize({
        width:size,
        height:size,
        fit:'contain',
        background:{r:255, b:255, g:255, alpha:0},
    })
    .pipelineColourspace('rgb16')
    .toColourspace('srgb')
    .toFormat('png')
    .toFile(`./src/public/img/views/${fileName}`)
}