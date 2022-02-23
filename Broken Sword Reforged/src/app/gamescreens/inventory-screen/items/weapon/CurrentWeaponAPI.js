export default class CurrentWeaponAPI {
    static read() {
        const json = sessionStorage.getItem('currentWeapon');
    
        if (!json) {
            return [      
                
            ]
        }
        return JSON.parse(json);
    }
    
    static save(data) {
        sessionStorage.setItem('currentWeapon', JSON.stringify(data))
    }
}