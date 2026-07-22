export async function getOceanImage(depth) {

    let response = await fetch(
        "NASA API URL HERE"
    );

    let data = await response.json();

    return data;
}

export async function setOceanBackground(depth){

    let imageURL = await getOceanImage(depth);

    document.getElementById("ocean-background")
        .style.backgroundImage = 
        `url(${imageURL})`;
}