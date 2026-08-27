class Map {
    constructor(scene) {
        this.scene = scene;
        this.createGround();
        this.createRamps();
        this.createPlatforms();
        this.createWalls();
    }

    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(500, 500);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    createRamps() {
        // Ramp 1 - 45 degrees
        const ramp1Geo = new THREE.PlaneGeometry(100, 150);
        const rampMat = new THREE.MeshLambertMaterial({ color: 0xa0522d });
        const ramp1 = new THREE.Mesh(ramp1Geo, rampMat);
        ramp1.rotation.x = -Math.PI / 4;
        ramp1.position.set(-100, 50, 100);
        ramp1.castShadow = true;
        ramp1.receiveShadow = true;
        this.scene.add(ramp1);

        // Ramp 2 - downhill
        const ramp2 = new THREE.Mesh(ramp1Geo, rampMat);
        ramp2.rotation.x = Math.PI / 5;
        ramp2.position.set(100, 30, 150);
        ramp2.castShadow = true;
        ramp2.receiveShadow = true;
        this.scene.add(ramp2);
    }

    createPlatforms() {
        const platforms = [
            { x: 0, y: 80, z: -200, w: 60, h: 20 },
            { x: 150, y: 100, z: -250, w: 50, h: 15 },
            { x: -150, y: 120, z: -300, w: 40, h: 15 },
            { x: 0, y: 140, z: -400, w: 50, h: 15 }
        ];

        const platformMat = new THREE.MeshLambertMaterial({ color: 0x4169e1 });

        platforms.forEach(p => {
            const geo = new THREE.BoxGeometry(p.w, p.h, p.w);
            const platform = new THREE.Mesh(geo, platformMat);
            platform.position.set(p.x, p.y, p.z);
            platform.castShadow = true;
            platform.receiveShadow = true;
            this.scene.add(platform);
        });
    }

    createWalls() {
        const wallMat = new THREE.MeshLambertMaterial({ color: 0x696969 });
        const wallGeo = new THREE.BoxGeometry(20, 200, 500);

        const leftWall = new THREE.Mesh(wallGeo, wallMat);
        leftWall.position.set(-250, 100, 0);
        leftWall.castShadow = true;
        this.scene.add(leftWall);

        const rightWall = new THREE.Mesh(wallGeo, wallMat);
        rightWall.position.set(250, 100, 0);
        rightWall.castShadow = true;
        this.scene.add(rightWall);
    }
}