export function get_iiif_code(settlement: string, shelfmark: string): string {
    let id: string;

    if (settlement === "Den Haag") {
        id = shelfmark.split(" ").join("_");
        if (id.indexOf('MMW') === -1) {
            id = 'MMW_' + id;
        }
        if (id.indexOf('ms._') !== -1) {
            id = id.replace('ms._', '');
        }
    } else {
        if (settlement === "Deventer") {
            id = "ABD_" + shelfmark.split(" ").join("_");
        } else {
            id = "TRL_" + shelfmark.split(" ").join("_");
        }
    }
    return id;
}