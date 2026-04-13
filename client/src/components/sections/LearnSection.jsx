import styles from './styles/LearnSection.module.css';

const LearnSection = () => {
    return (
        <section className={styles.learnSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>What is a computer image?</h2>
                <p className={styles.description}>
                    Cursors, also known as mouse pointers, are small graphical icons that represent the position of the mouse on a computer screen. They are an essential part of the user interface, allowing users to interact with their devices. Cursors can take various forms, such as arrows, hands, or custom designs, and they often change appearance based on the context (e.g., hovering over a link or resizing a window). Understanding cursors can enhance your user experience and allow you to customize your device to your liking.
                </p>
            </div>
            <div className={styles.container}>
                <h3 className={styles.subtitle}>Image Types in Cursors</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Vector image.</li>
                    <li className={styles.listItem}>Raster Image (PNG, GIF)</li>
                </ul>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>Vector Image</h3>
                <p className={styles.description}>
                    "Take a 100x100 mm sheet of paper. With a 3 mm wide green pencil draw a line from point [10,10] (a point 10 mm from left edge and 10 mm from bottom edge) to point [90,90]. Draw another line from [10,90] to [90,10]. Now take 10 mm wide red pencil and draw a circle with center at [50,50] and radius of 25 mm."
                    Computer uses similar commands when storing vector images. And here is the result:
                </p>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>File Formats</h3>
                <p className={styles.description}>
                    Consider the raster image mentioned earlier (100x100 pixels, no alpha channel - each pixel is described by specifying values for red, green, and blue color components). To store this image, 100x100x3 numbers must be stored (each number ranging from 0 to 100). 
                    That is a significant amount of data. The more data is needed, the more space does the image take up on a hard drive or on a memory card of a camera. 
                    And the more time it takes to download it from internet. Our goal is to reduce the amount of data as much as possible.
                    If we decided to use larger pixels, let's say 50x50, the amount of data would drop to one quarter (half width and half height). Similarly, a denser raster (200x200 pixels) would result in four times the amount of data.
                    It would be inefficient to store each pixel individually. A photograph of sky contains a large amount of very similar pixels and that property should be exploited. There are several standardized methods (image file formats) to reduce the amount of data required to store an image in a file. When judging an image file format, these properties should be taken in to account:
                </p>

                <h3 className={styles.subtitle}>JPEG File Format</h3>
                <p className={styles.description}>
                    JPEG file format was created to store photographs and it is very good at doing exactly that. It is not an exception, when a photograph is compressed to less than 10% of its original size. This file format is lossy, that means the original image is not remembered exactly, some details are omitted.
                </p>

                <h3 className={styles.subtitle}>PNG File Format</h3>
                <p className={styles.description}>
                    PNG is an acronym of Portable Network Graphics. This file format is intended for artificial images, that means images with sharp edges, areas filled using single color or a continuous color gradient. PNG uses a lossless compression and supports variable color depths and alpha channel.
                </p>
            </div>
        </section>
    );
}



export default LearnSection;