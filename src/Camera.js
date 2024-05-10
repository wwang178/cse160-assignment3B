class Camera {
    constructor() {
        this.eye = new Vector3([0, 0, 3]);
        this.at = new Vector3([0, 0, 100]);
        this.up = new Vector3([0, 1, 0]);
        this.panAmount = 5;
    }

    forward() {
        let f = this.at.subNew(this.eye);
        f.normalize();
        this.eye = this.eye.addNew(f);
        this.at = this.at.addNew(f);
    }

    back() {
        let f = this.at.subNew(this.eye);
        f.normalize();
        this.eye = this.eye.subNew(f);
        this.at = this.at.subNew(f);
    }

    left() {
        let f = this.at.subNew(this.eye);
        f.normalize();
        let s = Vector3.cross(f, this.up);
        s.normalize();
        this.eye = this.eye.subNew(s);
        this.at = this.at.subNew(s);
    }

    right() {
        let f = this.at.subNew(this.eye);
        f.normalize();
        let s = Vector3.cross(f, this.up);
        s.normalize();
        this.eye = this.eye.addNew(s);
        this.at = this.at.addNew(s);
    }

    moveUp() {
        this.eye = this.eye.addNew(new Vector3([0, 1, 0]));
        this.at = this.at.addNew(new Vector3([0, 1, 0]));
    }

    moveDown() {
        this.eye = this.eye.addNew(new Vector3([0, -1, 0]));
        this.at = this.at.addNew(new Vector3([0, -1, 0]));
    }

    panLeft() {
        let f = this.at.subNew(this.eye);
        let rMat = new Matrix4();
        rMat.setRotate(this.panAmount, this.up.x, this.up.y, this.up.z);
        let fPrime = rMat.multiplyVector3(f);
        this.at = this.eye.addNew(fPrime);
    }
    
    panRight() {
        let f = this.at.subNew(this.eye);
        let rMat = new Matrix4();
        rMat.setRotate(-this.panAmount, this.up.x, this.up.y, this.up.z);
        let fPrime = rMat.multiplyVector3(f);
        this.at = this.eye.addNew(fPrime);
    }

    panDown() {
        let f = this.at.subNew(this.eye);
        let rightVector = Vector3.cross(this.up, f);
        rightVector.normalize();
    
        let rMat = new Matrix4();
        rMat.setRotate(this.panAmount, rightVector.x, rightVector.y, rightVector.z);
        
        let fPrime = rMat.multiplyVector3(f);
        this.at = this.eye.addNew(fPrime);
    }

    panUp() {
        let f = this.at.subNew(this.eye);
        let rightVector = Vector3.cross(this.up, f);
        rightVector.normalize();
    
        let rMat = new Matrix4();
        rMat.setRotate(-this.panAmount, rightVector.x, rightVector.y, rightVector.z);
        
        let fPrime = rMat.multiplyVector3(f);
        this.at = this.eye.addNew(fPrime);
    }

    getPosInFront(distance) {
        let f = this.at.subNew(this.eye);
        f.normalize();
        f.mul(distance);
        let frontPos = this.eye.addNew(f);
        return frontPos;
    }
}