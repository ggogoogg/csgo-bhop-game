class Player {
    constructor(camera) {
        this.camera = camera;
        this.position = new THREE.Vector3(0, 100, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);
        
        this.yaw = 0;
        this.pitch = 0;
        
        this.speed = 2;
        this.jumpForce = 15;
        this.gravity = 0.8;
        this.friction = 0.98;
        this.airAcceleration = 0.15;
        this.groundAcceleration = 0.3;
        
        this.isGrounded = false;
        this.jumpCount = 0;
        this.lastJumpTime = 0;
        this.jumpCooldown = 50;
        
        this.mouseSensitivity = 0.003;
        this.size = new THREE.Vector3(16, 36, 16);
    }

    update(keys) {
        // Apply gravity
        this.velocity.y -= this.gravity;

        // Movement input
        const moveDir = new THREE.Vector3();
        const forward = new THREE.Vector3(
            Math.sin(this.yaw),
            0,
            Math.cos(this.yaw)
        );
        const right = new THREE.Vector3(
            Math.sin(this.yaw + Math.PI / 2),
            0,
            Math.cos(this.yaw + Math.PI / 2)
        );

        if (keys['w'] || keys['W']) moveDir.add(forward);
        if (keys['s'] || keys['S']) moveDir.sub(forward);
        if (keys['a'] || keys['A']) moveDir.sub(right);
        if (keys['d'] || keys['D']) moveDir.add(right);

        if (moveDir.length() > 0) {
            moveDir.normalize();
        }

        // Acceleration
        const accel = this.isGrounded ? this.groundAcceleration : this.airAcceleration;
        this.velocity.x += moveDir.x * accel * this.speed;
        this.velocity.z += moveDir.z * accel * this.speed;

        // Friction
        this.velocity.x *= this.friction;
        this.velocity.z *= this.friction;

        // Jumping (Bunnyhopping)
        if ((keys[' '] || keys['Spacebar']) && this.isGrounded) {
            const now = Date.now();
            if (now - this.lastJumpTime > this.jumpCooldown) {
                this.velocity.y = this.jumpForce;
                this.isGrounded = false;
                this.lastJumpTime = now;
            }
        }

        // Update position
        this.position.add(this.velocity);
        this.camera.position.copy(this.position);
        this.camera.position.y += 8; // Eye height

        // Collision with ground
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
    }

    handleMouseMove(event) {
        this.yaw -= event.movementX * this.mouseSensitivity;
        this.pitch -= event.movementY * this.mouseSensitivity;
        
        // Clamp pitch
        this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
        
        // Update camera rotation
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }
}