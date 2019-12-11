import React from 'react';
import { findDOMNode } from 'react-dom';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import { MapWrapper } from './css'

class MapLanding extends React.PureComponent {

	componentDidMount() {	
		var series = [['AND', '726', '1410'], ['ARE', '54064', '358423'], ['AFG', '4140', '12956'], ['ATG', '474', '1018'], ['AIA', '234', '353'], ['ALB', '3837', '10050'], ['ARM', '2116', '6913'], ['AGO', '3279', '11664'], ['ATA', '225', '254'], ['ARG', '46055', '320165'], ['ASM', '484', '679'], ['AUT', '16120', '65447'], ['AUS', '208134', '1296819'], ['ABW', '801', '1953'], ['ALA', '145', '285'], ['AZE', '2884', '10574'], ['BIH', '2694', '7567'], ['BRB', '1571', '4452'], ['BGD', '14214', '70885'], ['BEL', '53380', '348323'], ['BFA', '1385', '3229'], ['BGR', '10926', '46187'], ['BHR', '5524', '22966'], ['BDI', '565', '1096'], ['BEN', '1493', '2629'], ['BLM', '0', '0'], ['BMU', '1197', '4153'], ['BRN', '972', '3407'], ['BOL', '4220', '14061'], ['BES', '1167', '1964'], ['BRA', '129850', '1255362'], ['BHS', '1986', '6439'], ['BTN', '641', '1506'], ['BVT', '14', '16'], ['BWA', '2345', '10512'], ['BLR', '2347', '9496'], ['BLZ', '848', '1815'], ['CAN', '205244', '1654542'], ['', '307', '351'], ['CCK', '25', '25'], ['COD', '2166', '6343'], ['CAF', '286', '533'], ['COG', '1034', '2620'], ['CHE', '39374', '220321'], ['CIV', '3640', '7946'], ['COK', '114', '222'], ['CHL', '29686', '226532'], ['CMR', '3861', '9316'], ['CHN', '225282', '686310'], ['COL', '30455', '173591'], ['CRI', '7763', '38505'], ['CUB', '769', '1578'], ['CPV', '603', '1299'], ['CUW', '0', '0'], ['CXR', '90', '94'], ['CYP', '4569', '14134'], ['CZE', '18808', '104472'], ['DEU', '113478', '529649'], ['DJI', '469', '829'], ['DNK', '35478', '261987'], ['DMA', '287', '499'], ['DOM', '5941', '22594'], ['DZA', '8637', '38389'], ['ECU', '10171', '41746'], ['EST', '4057', '13064'], ['EGY', '24575', '133717'], ['ESH', '72', '80'], ['ERI', '182', '417'], ['ESP', '109220', '633734'], ['ETH', '3461', '12856'], ['FIN', '17264', '112765'], ['FJI', '1304', '6208'], ['FLK', '75', '113'], ['FSM', '167', '316'], ['FRO', '280', '760'], ['FRA', '130324', '1035759'], ['FRA', '0', '0'], ['GAB', '969', '2331'], ['GRD', '408', '1267'], ['GEO', '27687', '103795'], ['GUF', '286', '607'], ['GGY', '521', '1416'], ['GHA', '8957', '33694'], ['GIB', '682', '2099'], ['GRL', '268', '1224'], ['GMB', '660', '1500'], ['GIN', '714', '1502'], ['GLP', '786', '1454'], ['GNQ', '316', '736'], ['GRC', '18846', '76313'], ['SGS', '8', '8'], ['GTM', '6108', '18344'], ['GUM', '883', '2434'], ['GNB', '155', '215'], ['GUY', '625', '1513'], ['HKG', '45367', '182419'], ['HMD', '5', '5'], ['HND', '2811', '8285'], ['HRV', '9189', '43510'], ['HTI', '2115', '5461'], ['HUN', '11869', '55333'], ['IDN', '73571', '404018'], ['IRL', '35248', '202079'], ['ISR', '24361', '143735'], ['IMN', '574', '1352'], ['IND', '382720', '3847018'], ['IOT', '93', '105'], ['IRQ', '4310', '12510'], ['IRN', '14058', '57093'], ['ISL', '2444', '10418'], ['ITA', '115787', '776511'], ['JEY', '1273', '2203'], ['JAM', '3992', '17091'], ['JOR', '9222', '37908'], ['JPN', '44344', '187865'], ['KEN', '16694', '78653'], ['KGZ', '738', '1593'], ['KHM', '4056', '12724'], ['KIR', '147', '193'], ['COM', '164', '236'], ['KNA', '360', '684'], ['PRK', '73', '86'], ['KOR', '18645', '124292'], ['KWT', '7741', '40631'], ['CYM', '1004', '2734'], ['KAZ', '3528', '15645'], ['LAO', '865', '2131'], ['LBN', '10301', '36470'], ['LCA', '265', '640'], ['LIE', '365', '1090'], ['LKA', '10790', '55156'], ['LBR', '863', '2288'], ['LSO', '649', '2107'], ['LTU', '6074', '21982'], ['LUX', '5304', '25505'], ['LVA', '4812', '18100'], ['LBY', '1757', '5070'], ['MAR', '13459', '56347'], ['MCO', '1065', '2820'], ['MDA', '1714', '4684'], ['MNE', '790', '1747'], ['MAF', '604', '987'], ['MDG', '1470', '3555'], ['MHL', '152', '287'], ['MKD', '3639', '12111'], ['MLI', '1329', '2885'], ['MMR', '3000', '6701'], ['MNG', '1638', '4505'], ['MAC', '1327', '4937'], ['MNP', '234', '373'], ['MTQ', '706', '1236'], ['MRT', '549', '1113'], ['MSR', '66', '78'], ['MLT', '3951', '13578'], ['MUS', '3266', '11007'], ['MDV', '1263', '4111'], ['MWI', '1602', '5971'], ['MEX', '65621', '439070'], ['MYS', '58924', '277616'], ['MOZ', '2523', '8019'], ['NAM', '1989', '8991'], ['NCL', '648', '1687'], ['NER', '646', '1392'], ['NFK', '50', '53'], ['NGA', '20267', '112542'], ['NIC', '2708', '8264'], ['NLD', '148999', '1090321'], ['NOR', '22314', '184374'], ['NPL', '5577', '16447'], ['NRU', '52', '54'], ['NIU', '58', '61'], ['NZL', '36998', '213627'], ['OMN', '6029', '30816'], ['PAN', '6052', '25683'], ['PER', '20867', '132939'], ['PYF', '483', '1158'], ['PNG', '1423', '9148'], ['PHL', '65039', '265325'], ['PAK', '36169', '256852'], ['POL', '30503', '159786'], ['SPM', '17', '18'], ['PCN', '40', '41'], ['PRI', '8496', '32364'], ['PSE', '2011', '5618'], ['PRT', '30854', '170294'], ['PLW', '130', '192'], ['PRY', '2693', '8367'], ['QAT', '9804', '59460'], ['REU', '306', '573'], ['ROU', '27108', '139493'], ['SRB', '8948', '39379'], ['RUS', '32593', '139142'], ['RWA', '1999', '5347'], ['SAU', '24920', '193088'], ['SLB', '247', '520'], ['SYC', '478', '1027'], ['SDN', '2639', '8026'], ['SWE', '41209', '370042'], ['SGP', '69502', '328350'], ['SHN', '99', '141'], ['SVN', '5450', '22903'], ['SJM', '22', '24'], ['SVK', '7223', '28441'], ['SLE', '802', '2077'], ['SMR', '257', '450'], ['SEN', '3889', '10987'], ['SOM', '687', '1632'], ['SUR', '915', '2529'], ['SSD', '344', '839'], ['STP', '122', '159'], ['SLV', '3548', '12685'], ['SXM', '0', '0'], ['SYR', '3334', '7118'], ['SWZ', '809', '2364'], ['TCA', '400', '795'], ['TCD', '530', '1358'], ['ATF', '74', '78'], ['TGO', '1046', '1716'], ['THA', '22807', '88693'], ['TJK', '430', '963'], ['TKL', '48', '49'], ['TLS', '395', '812'], ['TKM', '394', '1131'], ['TUN', '8763', '35129'], ['TON', '202', '333'], ['TUR', '40532', '311846'], ['TTO', '4386', '19872'], ['TUV', '75', '79'], ['TWN', '18316', '104626'], ['TZA', '5566', '19541'], ['UKR', '15204', '58456'], ['UGA', '6351', '24605'], ['GBR', '237646', '1552405'], ['UMI', '0', '0'], ['USA', '1489152', '17232725'], ['URY', '7170', '33163'], ['UZB', '1299', '2726'], ['VAT', '148', '164'], ['VCT', '408', '726'], ['VEN', '11928', '69120'], ['VGB', '344', '568'], ['VIR', '1077', '2124'], ['VNM', '17200', '59422'], ['VUT', '281', '496'], ['WLF', '24', '32'], ['WSM', '251', '517'], ['YEM', '1530', '3870'], ['MYT', '98', '176'], ['ZAF', '65593', '444281'], ['ZMB', '2814', '14991'], ['ZWE', '4536', '21167']];
    // Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
    var dataset = {};
    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max series-value)
    var onlyValues = series.map(function(obj){ return obj[1]; });
    var minValue = 2,
            maxValue = 100;
    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
            .domain([minValue,maxValue])
            .range(["#DAE0E4","#DAE0E4"]); // gray color
    // fill dataset in appropriate format
    series.forEach(function(item){ //
        // item example value ["USA", 70]
        var iso = item[0], company = item[1], contact = item[2];
        dataset[iso] = { companies: company, contacts: contact, fillColor: paletteScale(10) };
    });
    // render map
    new Datamap({
        element: document.getElementById('container'),
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: { defaultFill: '#D8DFE4' },
        data: dataset,
        geographyConfig: {
            borderColor: '#ffffff',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: '#9FD7D1',
            // only change border
            highlightBorderColor: '#ffffff',
            // show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) { return ; }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Contacts: <strong>', data.contacts, '</strong>',
                    '<br>Organizations: <strong>', data.companies, '</strong>',
                    '</div>'].join('');
            }
        }
    });
	}
	
	render(){

		return(
			<MapWrapper>
				<div className="text">
					<div className="left">
						<span style={{fontSize:'20px'}}>Database</span>
						<br/>
						<span style={{fontSize:'13px'}}>200M+ Contacts and 11M+ Organizations</span>
					</div>
					<div className="right" onClick={this.props.toggleMap}>
						<i className='material-icons'>
							search
						</i>
						Search
					</div>

				</div>
				<div className='map'>
					<div id="container" style={{
						position: 'relative',
						width: '800px',
						height: '600px'}}
					></div>
				</div>
			</MapWrapper>
		)

	}
}

export default MapLanding;