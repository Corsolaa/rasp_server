export function updateSliders(slider, selector, value, cur, end) {
    let span = slider.querySelector("." + selector);
    let values = [cur, end]
    span.innerText = "level " + value;
    switch (selector) {
        case "slider_level":
            values[0] = value;
            break;
        case "slider1_level":
            values[1] = value;
            break;
    }
    return values;
}