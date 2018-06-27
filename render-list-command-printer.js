

module.exports = {

    run: function(options, callback) {
        var tileCount = 0,
        tileCoords = {},
        tileBounds;

        //set the initial z, x, and y tile names
        //z values are a fixed range defined in options
        tileCoords.z=options.zoom.min;
        //x and y ranges are based on the bounding box and the current zoom
        tileBounds=calcMinAndMaxValues(options.bbox, tileCoords.z);


        //start the recursive function that fetches tiles
        getTile();

        /* Function Declarations */

        //recursive function to iterate over each z, x, and y tile name
        //
        function getTile() {
            do {
              console.log( "render_list -a -m ajt -n 4 -s /var/run/renderd/renderd.sock -t /home/smartpilot/var/lib/mod_tile/ -z "+tileCoords.z+" -Z "+tileCoords.z+" -x "+tileBounds.xMin+" -X "+tileBounds.xMax+" -y "+tileBounds.yMin+" -Y "+tileBounds.yMax);
              tileCoords.z++;
              tileBounds=calcMinAndMaxValues(options.bbox, tileCoords.z);
            } while (tileCoords.z <= options.zoom.max);


        }

        //given a bounding box and zoom level, calculate x and y tile ranges
        function calcMinAndMaxValues(bbox, zoom) {
            var tileBounds = {};

            /* Not sure why yMin and yMax are transposed on the tile coordinate system */
            tileBounds.yMax = lat2tile(bbox[0], zoom);
            tileBounds.xMin = long2tile(bbox[1], zoom);
            tileBounds.yMin = lat2tile(bbox[2], zoom);
            tileBounds.xMax = long2tile(bbox[3], zoom);

            return tileBounds;
        }

        //lookup tile name based on lat/lon, courtesy of http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers
        function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
        function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); };

    }
}
