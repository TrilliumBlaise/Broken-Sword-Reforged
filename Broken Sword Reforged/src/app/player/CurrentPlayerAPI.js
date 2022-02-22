export default class CurrentPlayerAPI {
    static read() {
        const json = sessionStorage.getItem('currentPlayer');
    
        if (!json) {
            return [      
                
            ]
        }
        return JSON.parse(json);
        
    }
    
    static save(data) {
        sessionStorage.setItem('currentPlayer', JSON.stringify(data))
    }
}