function getStat( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

class Pokemon {
    constructor( base, exp, hp ) {
        Object.assign( this, base, exp );

        // Set initial static values
        this.starting_hp = hp || getStat( base.hp[0], base.hp[1] );
        this.starting_atk = getStat( base.atk[0], base.atk[1] );
        this.starting_satk = getStat( base.satk[0], base.satk[1] );
        this.starting_def = getStat( base.def[0], base.def[1] );
        this.starting_sdef = getStat( base.sdef[0], base.sdef[1] );
        this.exp = exp;

        // Set initial used values
        this.hp = this.starting_hp;
        this.atk = this.starting_atk;
        this.satk = this.starting_satk;
        this.def = this.starting_def;
        this.sdef = this.starting_sdef;

        this.canMove = true;
        this.canAttack = true;
        this.movesRemaining = base.speed;
        this.disabled = false;
        this.status = 'clean';
    };
};
export default Pokemon;