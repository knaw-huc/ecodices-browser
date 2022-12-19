export function get_iiif_code(settlement: string, shelfmark: string): string {
    let id: string;

    if (settlement === "Den Haag") {
        id = shelfmark.split(" ").join("_");
    } else {
        if (settlement === "Deventer") {
            id = "ABD_" + shelfmark.split(" ").join("_");
        } else {
            id = "TRL_" + shelfmark.split(" ").join("_");
        }
    }
    console.log(id);
    return id;
}