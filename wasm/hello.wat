(module
  (type $t0 (func (param i32 i32 i32) (result i32)))
  (type $t1 (func (result i32)))
  (type $t2 (func (param i32) (result i32)))
  (type $t3 (func (param i32)))
  (type $t4 (func))
  (type $t5 (func (param i32 i32) (result i32)))
  (type $t6 (func (param i32 i64 i32) (result i64)))
  (type $t7 (func (param i32 i32 i32 i32 i32) (result i32)))
  (type $t8 (func (param i32 f64 i32 i32 i32 i32) (result i32)))
  (type $t9 (func (param i32 i32)))
  (type $t10 (func (param i64 i32) (result i32)))
  (type $t11 (func (param i32 i64 i64 i32)))
  (type $t12 (func (param i32 i32 i32 i32) (result i32)))
  (type $t13 (func (param f64 i32) (result f64)))
  (type $t14 (func (param i32 i32 i32 i32 i32 i32 i32) (result i32)))
  (type $t15 (func (param i32 i32 i32)))
  (type $t16 (func (param i32 i32 i32 i32)))
  (type $t17 (func (param i64 i32 i32) (result i32)))
  (type $t18 (func (param i32 i32 i32 i32 i32)))
  (type $t19 (func (param f64) (result i64)))
  (type $t20 (func (param i64 i64) (result f64)))
  (type $t21 (func (param i32 i32 i64 i32) (result i64)))
  (import "wasi_snapshot_preview1" "fd_write" (func $wasi_snapshot_preview1.fd_write (type $t12)))
  (import "env" "emscripten_memcpy_big" (func $env.emscripten_memcpy_big (type $t0)))
  (import "env" "setTempRet0" (func $env.setTempRet0 (type $t3)))
  (func $__wasm_call_ctors (type $t4)
    call $emscripten_stack_init
    call $f41)
  (func $main (type $t5) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32)
    global.get $g0
    local.set $l2
    i32.const 16
    local.set $l3
    local.get $l2
    local.get $l3
    i32.sub
    local.set $l4
    local.get $l4
    global.set $g0
    local.get $l4
    local.get $p0
    i32.store offset=12
    local.get $l4
    local.get $p1
    i32.store offset=8
    i32.const 1078
    local.set $l5
    i32.const 0
    local.set $l6
    local.get $l5
    local.get $l6
    call $f5
    drop
    i32.const 0
    local.set $l7
    i32.const 16
    local.set $l8
    local.get $l4
    local.get $l8
    i32.add
    local.set $l9
    local.get $l9
    global.set $g0
    local.get $l7
    return)
  (func $f5 (type $t5) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32)
    global.get $g0
    i32.const 16
    i32.sub
    local.tee $l2
    global.set $g0
    local.get $l2
    local.get $p1
    i32.store offset=12
    i32.const 1584
    local.get $p0
    local.get $p1
    call $f33
    local.set $p1
    local.get $l2
    i32.const 16
    i32.add
    global.set $g0
    local.get $p1)
  (func $f6 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32)
    global.get $g0
    i32.const 32
    i32.sub
    local.tee $l3
    global.set $g0
    local.get $l3
    local.get $p0
    i32.load offset=28
    local.tee $l4
    i32.store offset=16
    local.get $p0
    i32.load offset=20
    local.set $l5
    local.get $l3
    local.get $p2
    i32.store offset=28
    local.get $l3
    local.get $p1
    i32.store offset=24
    local.get $l3
    local.get $l5
    local.get $l4
    i32.sub
    local.tee $p1
    i32.store offset=20
    local.get $p1
    local.get $p2
    i32.add
    local.set $l6
    i32.const 2
    local.set $l7
    local.get $l3
    i32.const 16
    i32.add
    local.set $p1
    block $B0
      block $B1
        block $B2
          block $B3
            local.get $p0
            i32.load offset=60
            local.get $l3
            i32.const 16
            i32.add
            i32.const 2
            local.get $l3
            i32.const 12
            i32.add
            call $wasi_snapshot_preview1.fd_write
            call $f37
            br_if $B3
            loop $L4
              local.get $l6
              local.get $l3
              i32.load offset=12
              local.tee $l4
              i32.eq
              br_if $B2
              local.get $l4
              i32.const -1
              i32.le_s
              br_if $B1
              local.get $p1
              local.get $l4
              local.get $p1
              i32.load offset=4
              local.tee $l8
              i32.gt_u
              local.tee $l5
              i32.const 3
              i32.shl
              i32.add
              local.tee $l9
              local.get $l9
              i32.load
              local.get $l4
              local.get $l8
              i32.const 0
              local.get $l5
              select
              i32.sub
              local.tee $l8
              i32.add
              i32.store
              local.get $p1
              i32.const 12
              i32.const 4
              local.get $l5
              select
              i32.add
              local.tee $l9
              local.get $l9
              i32.load
              local.get $l8
              i32.sub
              i32.store
              local.get $l6
              local.get $l4
              i32.sub
              local.set $l6
              local.get $p0
              i32.load offset=60
              local.get $p1
              i32.const 8
              i32.add
              local.get $p1
              local.get $l5
              select
              local.tee $p1
              local.get $l7
              local.get $l5
              i32.sub
              local.tee $l7
              local.get $l3
              i32.const 12
              i32.add
              call $wasi_snapshot_preview1.fd_write
              call $f37
              i32.eqz
              br_if $L4
            end
          end
          local.get $l6
          i32.const -1
          i32.ne
          br_if $B1
        end
        local.get $p0
        local.get $p0
        i32.load offset=44
        local.tee $p1
        i32.store offset=28
        local.get $p0
        local.get $p1
        i32.store offset=20
        local.get $p0
        local.get $p1
        local.get $p0
        i32.load offset=48
        i32.add
        i32.store offset=16
        local.get $p2
        local.set $l4
        br $B0
      end
      i32.const 0
      local.set $l4
      local.get $p0
      i32.const 0
      i32.store offset=28
      local.get $p0
      i64.const 0
      i64.store offset=16
      local.get $p0
      local.get $p0
      i32.load
      i32.const 32
      i32.or
      i32.store
      local.get $l7
      i32.const 2
      i32.eq
      br_if $B0
      local.get $p2
      local.get $p1
      i32.load offset=4
      i32.sub
      local.set $l4
    end
    local.get $l3
    i32.const 32
    i32.add
    global.set $g0
    local.get $l4)
  (func $f7 (type $t2) (param $p0 i32) (result i32)
    i32.const 0)
  (func $f8 (type $t6) (param $p0 i32) (param $p1 i64) (param $p2 i32) (result i64)
    i64.const 0)
  (func $f9 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i64)
    block $B0
      local.get $p2
      i32.eqz
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8
      local.get $p2
      local.get $p0
      i32.add
      local.tee $l3
      i32.const -1
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 3
      i32.lt_u
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8 offset=2
      local.get $p0
      local.get $p1
      i32.store8 offset=1
      local.get $l3
      i32.const -3
      i32.add
      local.get $p1
      i32.store8
      local.get $l3
      i32.const -2
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 7
      i32.lt_u
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8 offset=3
      local.get $l3
      i32.const -4
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 9
      i32.lt_u
      br_if $B0
      local.get $p0
      i32.const 0
      local.get $p0
      i32.sub
      i32.const 3
      i32.and
      local.tee $l4
      i32.add
      local.tee $l3
      local.get $p1
      i32.const 255
      i32.and
      i32.const 16843009
      i32.mul
      local.tee $p1
      i32.store
      local.get $l3
      local.get $p2
      local.get $l4
      i32.sub
      i32.const -4
      i32.and
      local.tee $l4
      i32.add
      local.tee $p2
      i32.const -4
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      i32.const 9
      i32.lt_u
      br_if $B0
      local.get $l3
      local.get $p1
      i32.store offset=8
      local.get $l3
      local.get $p1
      i32.store offset=4
      local.get $p2
      i32.const -8
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -12
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      i32.const 25
      i32.lt_u
      br_if $B0
      local.get $l3
      local.get $p1
      i32.store offset=24
      local.get $l3
      local.get $p1
      i32.store offset=20
      local.get $l3
      local.get $p1
      i32.store offset=16
      local.get $l3
      local.get $p1
      i32.store offset=12
      local.get $p2
      i32.const -16
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -20
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -24
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -28
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      local.get $l3
      i32.const 4
      i32.and
      i32.const 24
      i32.or
      local.tee $l5
      i32.sub
      local.tee $p2
      i32.const 32
      i32.lt_u
      br_if $B0
      local.get $p1
      i64.extend_i32_u
      i64.const 4294967297
      i64.mul
      local.set $l6
      local.get $l3
      local.get $l5
      i32.add
      local.set $p1
      loop $L1
        local.get $p1
        local.get $l6
        i64.store offset=24
        local.get $p1
        local.get $l6
        i64.store offset=16
        local.get $p1
        local.get $l6
        i64.store offset=8
        local.get $p1
        local.get $l6
        i64.store
        local.get $p1
        i32.const 32
        i32.add
        local.set $p1
        local.get $p2
        i32.const -32
        i32.add
        local.tee $p2
        i32.const 31
        i32.gt_u
        br_if $L1
      end
    end
    local.get $p0)
  (func $f10 (type $t2) (param $p0 i32) (result i32)
    i32.const 1)
  (func $f11 (type $t3) (param $p0 i32))
  (func $f12 (type $t3) (param $p0 i32))
  (func $f13 (type $t1) (result i32)
    i32.const 2776
    call $f12
    i32.const 2780)
  (func $__stdio_exit (type $t4)
    (local $l0 i32)
    block $B0
      call $f13
      i32.load
      local.tee $l0
      i32.eqz
      br_if $B0
      loop $L1
        local.get $l0
        call $f15
        local.get $l0
        i32.load offset=56
        local.tee $l0
        br_if $L1
      end
    end
    i32.const 0
    i32.load offset=2784
    call $f15
    i32.const 0
    i32.load offset=1728
    call $f15
    i32.const 0
    i32.load offset=2784
    call $f15)
  (func $f15 (type $t3) (param $p0 i32)
    (local $l1 i32) (local $l2 i32)
    block $B0
      local.get $p0
      i32.eqz
      br_if $B0
      block $B1
        local.get $p0
        i32.load offset=76
        i32.const 0
        i32.lt_s
        br_if $B1
        local.get $p0
        call $f10
        drop
      end
      block $B2
        local.get $p0
        i32.load offset=20
        local.get $p0
        i32.load offset=28
        i32.eq
        br_if $B2
        local.get $p0
        i32.const 0
        i32.const 0
        local.get $p0
        i32.load offset=36
        call_indirect (type $t0) $__indirect_function_table
        drop
      end
      local.get $p0
      i32.load offset=4
      local.tee $l1
      local.get $p0
      i32.load offset=8
      local.tee $l2
      i32.eq
      br_if $B0
      local.get $p0
      local.get $l1
      local.get $l2
      i32.sub
      i64.extend_i32_s
      i32.const 1
      local.get $p0
      i32.load offset=40
      call_indirect (type $t6) $__indirect_function_table
      drop
    end)
  (func $f16 (type $t2) (param $p0 i32) (result i32)
    (local $l1 i32)
    local.get $p0
    local.get $p0
    i32.load offset=72
    local.tee $l1
    i32.const -1
    i32.add
    local.get $l1
    i32.or
    i32.store offset=72
    block $B0
      local.get $p0
      i32.load
      local.tee $l1
      i32.const 8
      i32.and
      i32.eqz
      br_if $B0
      local.get $p0
      local.get $l1
      i32.const 32
      i32.or
      i32.store
      i32.const -1
      return
    end
    local.get $p0
    i64.const 0
    i64.store offset=4 align=4
    local.get $p0
    local.get $p0
    i32.load offset=44
    local.tee $l1
    i32.store offset=28
    local.get $p0
    local.get $l1
    i32.store offset=20
    local.get $p0
    local.get $l1
    local.get $p0
    i32.load offset=48
    i32.add
    i32.store offset=16
    i32.const 0)
  (func $f17 (type $t2) (param $p0 i32) (result i32)
    local.get $p0
    i32.const -48
    i32.add
    i32.const 10
    i32.lt_u)
  (func $f18 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32)
    local.get $p2
    i32.const 0
    i32.ne
    local.set $l3
    block $B0
      block $B1
        block $B2
          local.get $p0
          i32.const 3
          i32.and
          i32.eqz
          br_if $B2
          local.get $p2
          i32.eqz
          br_if $B2
          local.get $p1
          i32.const 255
          i32.and
          local.set $l4
          loop $L3
            local.get $p0
            i32.load8_u
            local.get $l4
            i32.eq
            br_if $B1
            local.get $p2
            i32.const -1
            i32.add
            local.tee $p2
            i32.const 0
            i32.ne
            local.set $l3
            local.get $p0
            i32.const 1
            i32.add
            local.tee $p0
            i32.const 3
            i32.and
            i32.eqz
            br_if $B2
            local.get $p2
            br_if $L3
          end
        end
        local.get $l3
        i32.eqz
        br_if $B0
      end
      block $B4
        local.get $p0
        i32.load8_u
        local.get $p1
        i32.const 255
        i32.and
        i32.eq
        br_if $B4
        local.get $p2
        i32.const 4
        i32.lt_u
        br_if $B4
        local.get $p1
        i32.const 255
        i32.and
        i32.const 16843009
        i32.mul
        local.set $l4
        loop $L5
          local.get $p0
          i32.load
          local.get $l4
          i32.xor
          local.tee $l3
          i32.const -1
          i32.xor
          local.get $l3
          i32.const -16843009
          i32.add
          i32.and
          i32.const -2139062144
          i32.and
          br_if $B4
          local.get $p0
          i32.const 4
          i32.add
          local.set $p0
          local.get $p2
          i32.const -4
          i32.add
          local.tee $p2
          i32.const 3
          i32.gt_u
          br_if $L5
        end
      end
      local.get $p2
      i32.eqz
      br_if $B0
      local.get $p1
      i32.const 255
      i32.and
      local.set $l3
      loop $L6
        block $B7
          local.get $p0
          i32.load8_u
          local.get $l3
          i32.ne
          br_if $B7
          local.get $p0
          return
        end
        local.get $p0
        i32.const 1
        i32.add
        local.set $p0
        local.get $p2
        i32.const -1
        i32.add
        local.tee $p2
        br_if $L6
      end
    end
    i32.const 0)
  (func $f19 (type $t5) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32)
    local.get $p0
    i32.const 0
    local.get $p1
    call $f18
    local.tee $l2
    local.get $p0
    i32.sub
    local.get $p1
    local.get $l2
    select)
  (func $__errno_location (type $t1) (result i32)
    i32.const 2788)
  (func $f21 (type $t13) (param $p0 f64) (param $p1 i32) (result f64)
    (local $l2 i64) (local $l3 i32)
    block $B0
      local.get $p0
      i64.reinterpret_f64
      local.tee $l2
      i64.const 52
      i64.shr_u
      i32.wrap_i64
      i32.const 2047
      i32.and
      local.tee $l3
      i32.const 2047
      i32.eq
      br_if $B0
      block $B1
        local.get $l3
        br_if $B1
        block $B2
          block $B3
            local.get $p0
            f64.const 0x0p+0 (;=0;)
            f64.ne
            br_if $B3
            i32.const 0
            local.set $l3
            br $B2
          end
          local.get $p0
          f64.const 0x1p+64 (;=1.84467e+19;)
          f64.mul
          local.get $p1
          call $f21
          local.set $p0
          local.get $p1
          i32.load
          i32.const -64
          i32.add
          local.set $l3
        end
        local.get $p1
        local.get $l3
        i32.store
        local.get $p0
        return
      end
      local.get $p1
      local.get $l3
      i32.const -1022
      i32.add
      i32.store
      local.get $l2
      i64.const -9218868437227405313
      i64.and
      i64.const 4602678819172646912
      i64.or
      f64.reinterpret_i64
      local.set $p0
    end
    local.get $p0)
  (func $f22 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    block $B0
      local.get $p2
      i32.const 512
      i32.lt_u
      br_if $B0
      local.get $p0
      local.get $p1
      local.get $p2
      call $env.emscripten_memcpy_big
      drop
      local.get $p0
      return
    end
    local.get $p0
    local.get $p2
    i32.add
    local.set $l3
    block $B1
      block $B2
        local.get $p1
        local.get $p0
        i32.xor
        i32.const 3
        i32.and
        br_if $B2
        block $B3
          block $B4
            local.get $p0
            i32.const 3
            i32.and
            br_if $B4
            local.get $p0
            local.set $p2
            br $B3
          end
          block $B5
            local.get $p2
            br_if $B5
            local.get $p0
            local.set $p2
            br $B3
          end
          local.get $p0
          local.set $p2
          loop $L6
            local.get $p2
            local.get $p1
            i32.load8_u
            i32.store8
            local.get $p1
            i32.const 1
            i32.add
            local.set $p1
            local.get $p2
            i32.const 1
            i32.add
            local.tee $p2
            i32.const 3
            i32.and
            i32.eqz
            br_if $B3
            local.get $p2
            local.get $l3
            i32.lt_u
            br_if $L6
          end
        end
        block $B7
          local.get $l3
          i32.const -4
          i32.and
          local.tee $l4
          i32.const 64
          i32.lt_u
          br_if $B7
          local.get $p2
          local.get $l4
          i32.const -64
          i32.add
          local.tee $l5
          i32.gt_u
          br_if $B7
          loop $L8
            local.get $p2
            local.get $p1
            i32.load
            i32.store
            local.get $p2
            local.get $p1
            i32.load offset=4
            i32.store offset=4
            local.get $p2
            local.get $p1
            i32.load offset=8
            i32.store offset=8
            local.get $p2
            local.get $p1
            i32.load offset=12
            i32.store offset=12
            local.get $p2
            local.get $p1
            i32.load offset=16
            i32.store offset=16
            local.get $p2
            local.get $p1
            i32.load offset=20
            i32.store offset=20
            local.get $p2
            local.get $p1
            i32.load offset=24
            i32.store offset=24
            local.get $p2
            local.get $p1
            i32.load offset=28
            i32.store offset=28
            local.get $p2
            local.get $p1
            i32.load offset=32
            i32.store offset=32
            local.get $p2
            local.get $p1
            i32.load offset=36
            i32.store offset=36
            local.get $p2
            local.get $p1
            i32.load offset=40
            i32.store offset=40
            local.get $p2
            local.get $p1
            i32.load offset=44
            i32.store offset=44
            local.get $p2
            local.get $p1
            i32.load offset=48
            i32.store offset=48
            local.get $p2
            local.get $p1
            i32.load offset=52
            i32.store offset=52
            local.get $p2
            local.get $p1
            i32.load offset=56
            i32.store offset=56
            local.get $p2
            local.get $p1
            i32.load offset=60
            i32.store offset=60
            local.get $p1
            i32.const 64
            i32.add
            local.set $p1
            local.get $p2
            i32.const 64
            i32.add
            local.tee $p2
            local.get $l5
            i32.le_u
            br_if $L8
          end
        end
        local.get $p2
        local.get $l4
        i32.ge_u
        br_if $B1
        loop $L9
          local.get $p2
          local.get $p1
          i32.load
          i32.store
          local.get $p1
          i32.const 4
          i32.add
          local.set $p1
          local.get $p2
          i32.const 4
          i32.add
          local.tee $p2
          local.get $l4
          i32.lt_u
          br_if $L9
          br $B1
        end
        unreachable
      end
      block $B10
        local.get $l3
        i32.const 4
        i32.ge_u
        br_if $B10
        local.get $p0
        local.set $p2
        br $B1
      end
      block $B11
        local.get $l3
        i32.const -4
        i32.add
        local.tee $l4
        local.get $p0
        i32.ge_u
        br_if $B11
        local.get $p0
        local.set $p2
        br $B1
      end
      local.get $p0
      local.set $p2
      loop $L12
        local.get $p2
        local.get $p1
        i32.load8_u
        i32.store8
        local.get $p2
        local.get $p1
        i32.load8_u offset=1
        i32.store8 offset=1
        local.get $p2
        local.get $p1
        i32.load8_u offset=2
        i32.store8 offset=2
        local.get $p2
        local.get $p1
        i32.load8_u offset=3
        i32.store8 offset=3
        local.get $p1
        i32.const 4
        i32.add
        local.set $p1
        local.get $p2
        i32.const 4
        i32.add
        local.tee $p2
        local.get $l4
        i32.le_u
        br_if $L12
      end
    end
    block $B13
      local.get $p2
      local.get $l3
      i32.ge_u
      br_if $B13
      loop $L14
        local.get $p2
        local.get $p1
        i32.load8_u
        i32.store8
        local.get $p1
        i32.const 1
        i32.add
        local.set $p1
        local.get $p2
        i32.const 1
        i32.add
        local.tee $p2
        local.get $l3
        i32.ne
        br_if $L14
      end
    end
    local.get $p0)
  (func $f23 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    block $B0
      block $B1
        local.get $p2
        i32.load offset=16
        local.tee $l3
        br_if $B1
        i32.const 0
        local.set $l4
        local.get $p2
        call $f16
        br_if $B0
        local.get $p2
        i32.load offset=16
        local.set $l3
      end
      block $B2
        local.get $l3
        local.get $p2
        i32.load offset=20
        local.tee $l5
        i32.sub
        local.get $p1
        i32.ge_u
        br_if $B2
        local.get $p2
        local.get $p0
        local.get $p1
        local.get $p2
        i32.load offset=36
        call_indirect (type $t0) $__indirect_function_table
        return
      end
      block $B3
        block $B4
          local.get $p2
          i32.load offset=80
          i32.const 0
          i32.ge_s
          br_if $B4
          i32.const 0
          local.set $l3
          br $B3
        end
        local.get $p1
        local.set $l4
        loop $L5
          block $B6
            local.get $l4
            local.tee $l3
            br_if $B6
            i32.const 0
            local.set $l3
            br $B3
          end
          local.get $p0
          local.get $l3
          i32.const -1
          i32.add
          local.tee $l4
          i32.add
          i32.load8_u
          i32.const 10
          i32.ne
          br_if $L5
        end
        local.get $p2
        local.get $p0
        local.get $l3
        local.get $p2
        i32.load offset=36
        call_indirect (type $t0) $__indirect_function_table
        local.tee $l4
        local.get $l3
        i32.lt_u
        br_if $B0
        local.get $p0
        local.get $l3
        i32.add
        local.set $p0
        local.get $p1
        local.get $l3
        i32.sub
        local.set $p1
        local.get $p2
        i32.load offset=20
        local.set $l5
      end
      local.get $l5
      local.get $p0
      local.get $p1
      call $f22
      drop
      local.get $p2
      local.get $p2
      i32.load offset=20
      local.get $p1
      i32.add
      i32.store offset=20
      local.get $l3
      local.get $p1
      i32.add
      local.set $l4
    end
    local.get $l4)
  (func $f24 (type $t7) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (result i32)
    (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32)
    global.get $g0
    i32.const 208
    i32.sub
    local.tee $l5
    global.set $g0
    local.get $l5
    local.get $p2
    i32.store offset=204
    i32.const 0
    local.set $l6
    local.get $l5
    i32.const 160
    i32.add
    i32.const 0
    i32.const 40
    call $f9
    drop
    local.get $l5
    local.get $l5
    i32.load offset=204
    i32.store offset=200
    block $B0
      block $B1
        i32.const 0
        local.get $p1
        local.get $l5
        i32.const 200
        i32.add
        local.get $l5
        i32.const 80
        i32.add
        local.get $l5
        i32.const 160
        i32.add
        local.get $p3
        local.get $p4
        call $f25
        i32.const 0
        i32.ge_s
        br_if $B1
        i32.const -1
        local.set $p1
        br $B0
      end
      block $B2
        local.get $p0
        i32.load offset=76
        i32.const 0
        i32.lt_s
        br_if $B2
        local.get $p0
        call $f10
        local.set $l6
      end
      local.get $p0
      i32.load
      local.set $l7
      block $B3
        local.get $p0
        i32.load offset=72
        i32.const 0
        i32.gt_s
        br_if $B3
        local.get $p0
        local.get $l7
        i32.const -33
        i32.and
        i32.store
      end
      block $B4
        block $B5
          block $B6
            block $B7
              local.get $p0
              i32.load offset=48
              br_if $B7
              local.get $p0
              i32.const 80
              i32.store offset=48
              local.get $p0
              i32.const 0
              i32.store offset=28
              local.get $p0
              i64.const 0
              i64.store offset=16
              local.get $p0
              i32.load offset=44
              local.set $l8
              local.get $p0
              local.get $l5
              i32.store offset=44
              br $B6
            end
            i32.const 0
            local.set $l8
            local.get $p0
            i32.load offset=16
            br_if $B5
          end
          i32.const -1
          local.set $p2
          local.get $p0
          call $f16
          br_if $B4
        end
        local.get $p0
        local.get $p1
        local.get $l5
        i32.const 200
        i32.add
        local.get $l5
        i32.const 80
        i32.add
        local.get $l5
        i32.const 160
        i32.add
        local.get $p3
        local.get $p4
        call $f25
        local.set $p2
      end
      local.get $l7
      i32.const 32
      i32.and
      local.set $p1
      block $B8
        local.get $l8
        i32.eqz
        br_if $B8
        local.get $p0
        i32.const 0
        i32.const 0
        local.get $p0
        i32.load offset=36
        call_indirect (type $t0) $__indirect_function_table
        drop
        local.get $p0
        i32.const 0
        i32.store offset=48
        local.get $p0
        local.get $l8
        i32.store offset=44
        local.get $p0
        i32.const 0
        i32.store offset=28
        local.get $p0
        i32.load offset=20
        local.set $p3
        local.get $p0
        i64.const 0
        i64.store offset=16
        local.get $p2
        i32.const -1
        local.get $p3
        select
        local.set $p2
      end
      local.get $p0
      local.get $p0
      i32.load
      local.tee $p3
      local.get $p1
      i32.or
      i32.store
      i32.const -1
      local.get $p2
      local.get $p3
      i32.const 32
      i32.and
      select
      local.set $p1
      local.get $l6
      i32.eqz
      br_if $B0
      local.get $p0
      call $f11
    end
    local.get $l5
    i32.const 208
    i32.add
    global.set $g0
    local.get $p1)
  (func $f25 (type $t14) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (param $p5 i32) (param $p6 i32) (result i32)
    (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i64)
    global.get $g0
    i32.const 80
    i32.sub
    local.tee $l7
    global.set $g0
    local.get $l7
    local.get $p1
    i32.store offset=76
    local.get $l7
    i32.const 55
    i32.add
    local.set $l8
    local.get $l7
    i32.const 56
    i32.add
    local.set $l9
    i32.const 0
    local.set $l10
    i32.const 0
    local.set $l11
    i32.const 0
    local.set $p1
    block $B0
      block $B1
        block $B2
          block $B3
            loop $L4
              local.get $p1
              i32.const 2147483647
              local.get $l11
              i32.sub
              i32.gt_s
              br_if $B3
              local.get $p1
              local.get $l11
              i32.add
              local.set $l11
              local.get $l7
              i32.load offset=76
              local.tee $l12
              local.set $p1
              block $B5
                block $B6
                  block $B7
                    block $B8
                      block $B9
                        local.get $l12
                        i32.load8_u
                        local.tee $l13
                        i32.eqz
                        br_if $B9
                        loop $L10
                          block $B11
                            block $B12
                              block $B13
                                local.get $l13
                                i32.const 255
                                i32.and
                                local.tee $l13
                                br_if $B13
                                local.get $p1
                                local.set $l13
                                br $B12
                              end
                              local.get $l13
                              i32.const 37
                              i32.ne
                              br_if $B11
                              local.get $p1
                              local.set $l13
                              loop $L14
                                local.get $p1
                                i32.load8_u offset=1
                                i32.const 37
                                i32.ne
                                br_if $B12
                                local.get $l7
                                local.get $p1
                                i32.const 2
                                i32.add
                                local.tee $l14
                                i32.store offset=76
                                local.get $l13
                                i32.const 1
                                i32.add
                                local.set $l13
                                local.get $p1
                                i32.load8_u offset=2
                                local.set $l15
                                local.get $l14
                                local.set $p1
                                local.get $l15
                                i32.const 37
                                i32.eq
                                br_if $L14
                              end
                            end
                            local.get $l13
                            local.get $l12
                            i32.sub
                            local.tee $p1
                            i32.const 2147483647
                            local.get $l11
                            i32.sub
                            local.tee $l13
                            i32.gt_s
                            br_if $B3
                            block $B15
                              local.get $p0
                              i32.eqz
                              br_if $B15
                              local.get $p0
                              local.get $l12
                              local.get $p1
                              call $f26
                            end
                            local.get $p1
                            br_if $L4
                            i32.const -1
                            local.set $l16
                            i32.const 1
                            local.set $l14
                            local.get $l7
                            i32.load offset=76
                            i32.load8_s offset=1
                            call $f17
                            local.set $l15
                            local.get $l7
                            i32.load offset=76
                            local.set $p1
                            block $B16
                              local.get $l15
                              i32.eqz
                              br_if $B16
                              local.get $p1
                              i32.load8_u offset=2
                              i32.const 36
                              i32.ne
                              br_if $B16
                              local.get $p1
                              i32.load8_s offset=1
                              i32.const -48
                              i32.add
                              local.set $l16
                              i32.const 1
                              local.set $l10
                              i32.const 3
                              local.set $l14
                            end
                            local.get $l7
                            local.get $p1
                            local.get $l14
                            i32.add
                            local.tee $p1
                            i32.store offset=76
                            i32.const 0
                            local.set $l17
                            block $B17
                              block $B18
                                local.get $p1
                                i32.load8_s
                                local.tee $l18
                                i32.const -32
                                i32.add
                                local.tee $l15
                                i32.const 31
                                i32.le_u
                                br_if $B18
                                local.get $p1
                                local.set $l14
                                br $B17
                              end
                              i32.const 0
                              local.set $l17
                              local.get $p1
                              local.set $l14
                              i32.const 1
                              local.get $l15
                              i32.shl
                              local.tee $l15
                              i32.const 75913
                              i32.and
                              i32.eqz
                              br_if $B17
                              loop $L19
                                local.get $l7
                                local.get $p1
                                i32.const 1
                                i32.add
                                local.tee $l14
                                i32.store offset=76
                                local.get $l15
                                local.get $l17
                                i32.or
                                local.set $l17
                                local.get $p1
                                i32.load8_s offset=1
                                local.tee $l18
                                i32.const -32
                                i32.add
                                local.tee $l15
                                i32.const 32
                                i32.ge_u
                                br_if $B17
                                local.get $l14
                                local.set $p1
                                i32.const 1
                                local.get $l15
                                i32.shl
                                local.tee $l15
                                i32.const 75913
                                i32.and
                                br_if $L19
                              end
                            end
                            block $B20
                              block $B21
                                local.get $l18
                                i32.const 42
                                i32.ne
                                br_if $B21
                                block $B22
                                  block $B23
                                    local.get $l14
                                    i32.load8_s offset=1
                                    call $f17
                                    i32.eqz
                                    br_if $B23
                                    local.get $l7
                                    i32.load offset=76
                                    local.tee $l14
                                    i32.load8_u offset=2
                                    i32.const 36
                                    i32.ne
                                    br_if $B23
                                    local.get $l14
                                    i32.load8_s offset=1
                                    i32.const 2
                                    i32.shl
                                    local.get $p4
                                    i32.add
                                    i32.const -192
                                    i32.add
                                    i32.const 10
                                    i32.store
                                    local.get $l14
                                    i32.const 3
                                    i32.add
                                    local.set $p1
                                    local.get $l14
                                    i32.load8_s offset=1
                                    i32.const 3
                                    i32.shl
                                    local.get $p3
                                    i32.add
                                    i32.const -384
                                    i32.add
                                    i32.load
                                    local.set $l19
                                    i32.const 1
                                    local.set $l10
                                    br $B22
                                  end
                                  local.get $l10
                                  br_if $B8
                                  i32.const 0
                                  local.set $l10
                                  i32.const 0
                                  local.set $l19
                                  block $B24
                                    local.get $p0
                                    i32.eqz
                                    br_if $B24
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p1
                                    i32.load
                                    local.set $l19
                                  end
                                  local.get $l7
                                  i32.load offset=76
                                  i32.const 1
                                  i32.add
                                  local.set $p1
                                end
                                local.get $l7
                                local.get $p1
                                i32.store offset=76
                                local.get $l19
                                i32.const -1
                                i32.gt_s
                                br_if $B20
                                i32.const 0
                                local.get $l19
                                i32.sub
                                local.set $l19
                                local.get $l17
                                i32.const 8192
                                i32.or
                                local.set $l17
                                br $B20
                              end
                              local.get $l7
                              i32.const 76
                              i32.add
                              call $f27
                              local.tee $l19
                              i32.const 0
                              i32.lt_s
                              br_if $B3
                              local.get $l7
                              i32.load offset=76
                              local.set $p1
                            end
                            i32.const 0
                            local.set $l14
                            i32.const -1
                            local.set $l20
                            block $B25
                              block $B26
                                local.get $p1
                                i32.load8_u
                                i32.const 46
                                i32.eq
                                br_if $B26
                                i32.const 0
                                local.set $l21
                                br $B25
                              end
                              block $B27
                                local.get $p1
                                i32.load8_u offset=1
                                i32.const 42
                                i32.ne
                                br_if $B27
                                block $B28
                                  block $B29
                                    local.get $p1
                                    i32.load8_s offset=2
                                    call $f17
                                    i32.eqz
                                    br_if $B29
                                    local.get $l7
                                    i32.load offset=76
                                    local.tee $l15
                                    i32.load8_u offset=3
                                    i32.const 36
                                    i32.ne
                                    br_if $B29
                                    local.get $l15
                                    i32.load8_s offset=2
                                    i32.const 2
                                    i32.shl
                                    local.get $p4
                                    i32.add
                                    i32.const -192
                                    i32.add
                                    i32.const 10
                                    i32.store
                                    local.get $l15
                                    i32.const 4
                                    i32.add
                                    local.set $p1
                                    local.get $l15
                                    i32.load8_s offset=2
                                    i32.const 3
                                    i32.shl
                                    local.get $p3
                                    i32.add
                                    i32.const -384
                                    i32.add
                                    i32.load
                                    local.set $l20
                                    br $B28
                                  end
                                  local.get $l10
                                  br_if $B8
                                  block $B30
                                    block $B31
                                      local.get $p0
                                      br_if $B31
                                      i32.const 0
                                      local.set $l20
                                      br $B30
                                    end
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p1
                                    i32.load
                                    local.set $l20
                                  end
                                  local.get $l7
                                  i32.load offset=76
                                  i32.const 2
                                  i32.add
                                  local.set $p1
                                end
                                local.get $l7
                                local.get $p1
                                i32.store offset=76
                                local.get $l20
                                i32.const -1
                                i32.xor
                                i32.const 31
                                i32.shr_u
                                local.set $l21
                                br $B25
                              end
                              local.get $l7
                              local.get $p1
                              i32.const 1
                              i32.add
                              i32.store offset=76
                              i32.const 1
                              local.set $l21
                              local.get $l7
                              i32.const 76
                              i32.add
                              call $f27
                              local.set $l20
                              local.get $l7
                              i32.load offset=76
                              local.set $p1
                            end
                            loop $L32
                              local.get $l14
                              local.set $l15
                              i32.const 28
                              local.set $l22
                              local.get $p1
                              i32.load8_s
                              i32.const -123
                              i32.add
                              i32.const -58
                              i32.lt_u
                              br_if $B2
                              local.get $l7
                              local.get $p1
                              i32.const 1
                              i32.add
                              local.tee $l18
                              i32.store offset=76
                              local.get $p1
                              i32.load8_s
                              local.set $l14
                              local.get $l18
                              local.set $p1
                              local.get $l14
                              local.get $l15
                              i32.const 58
                              i32.mul
                              i32.add
                              i32.const 1039
                              i32.add
                              i32.load8_u
                              local.tee $l14
                              i32.const -1
                              i32.add
                              i32.const 8
                              i32.lt_u
                              br_if $L32
                            end
                            block $B33
                              block $B34
                                block $B35
                                  local.get $l14
                                  i32.const 27
                                  i32.eq
                                  br_if $B35
                                  local.get $l14
                                  i32.eqz
                                  br_if $B2
                                  block $B36
                                    local.get $l16
                                    i32.const 0
                                    i32.lt_s
                                    br_if $B36
                                    local.get $p4
                                    local.get $l16
                                    i32.const 2
                                    i32.shl
                                    i32.add
                                    local.get $l14
                                    i32.store
                                    local.get $l7
                                    local.get $p3
                                    local.get $l16
                                    i32.const 3
                                    i32.shl
                                    i32.add
                                    i64.load
                                    i64.store offset=64
                                    br $B34
                                  end
                                  local.get $p0
                                  i32.eqz
                                  br_if $B5
                                  local.get $l7
                                  i32.const 64
                                  i32.add
                                  local.get $l14
                                  local.get $p2
                                  local.get $p6
                                  call $f28
                                  local.get $l7
                                  i32.load offset=76
                                  local.set $l18
                                  br $B33
                                end
                                local.get $l16
                                i32.const -1
                                i32.gt_s
                                br_if $B2
                              end
                              i32.const 0
                              local.set $p1
                              local.get $p0
                              i32.eqz
                              br_if $L4
                            end
                            local.get $l17
                            i32.const -65537
                            i32.and
                            local.tee $l23
                            local.get $l17
                            local.get $l17
                            i32.const 8192
                            i32.and
                            select
                            local.set $l14
                            i32.const 0
                            local.set $l17
                            i32.const 1024
                            local.set $l16
                            local.get $l9
                            local.set $l22
                            block $B37
                              block $B38
                                block $B39
                                  block $B40
                                    block $B41
                                      block $B42
                                        block $B43
                                          block $B44
                                            block $B45
                                              block $B46
                                                block $B47
                                                  block $B48
                                                    block $B49
                                                      block $B50
                                                        block $B51
                                                          block $B52
                                                            local.get $l18
                                                            i32.const -1
                                                            i32.add
                                                            i32.load8_s
                                                            local.tee $p1
                                                            i32.const -33
                                                            i32.and
                                                            local.get $p1
                                                            local.get $p1
                                                            i32.const 15
                                                            i32.and
                                                            i32.const 3
                                                            i32.eq
                                                            select
                                                            local.get $p1
                                                            local.get $l15
                                                            select
                                                            local.tee $p1
                                                            i32.const -88
                                                            i32.add
                                                            br_table $B48 $B6 $B6 $B6 $B6 $B6 $B6 $B6 $B6 $B38 $B6 $B37 $B46 $B38 $B38 $B38 $B6 $B46 $B6 $B6 $B6 $B6 $B50 $B47 $B49 $B6 $B6 $B43 $B6 $B51 $B6 $B6 $B48 $B52
                                                          end
                                                          local.get $l9
                                                          local.set $l22
                                                          block $B53
                                                            local.get $p1
                                                            i32.const -65
                                                            i32.add
                                                            br_table $B38 $B6 $B41 $B6 $B38 $B38 $B38 $B53
                                                          end
                                                          local.get $p1
                                                          i32.const 83
                                                          i32.eq
                                                          br_if $B42
                                                          br $B7
                                                        end
                                                        i32.const 0
                                                        local.set $l17
                                                        i32.const 1024
                                                        local.set $l16
                                                        local.get $l7
                                                        i64.load offset=64
                                                        local.set $l24
                                                        br $B45
                                                      end
                                                      i32.const 0
                                                      local.set $p1
                                                      block $B54
                                                        block $B55
                                                          block $B56
                                                            block $B57
                                                              block $B58
                                                                block $B59
                                                                  block $B60
                                                                    local.get $l15
                                                                    i32.const 255
                                                                    i32.and
                                                                    br_table $B60 $B59 $B58 $B57 $B56 $L4 $B55 $B54 $L4
                                                                  end
                                                                  local.get $l7
                                                                  i32.load offset=64
                                                                  local.get $l11
                                                                  i32.store
                                                                  br $L4
                                                                end
                                                                local.get $l7
                                                                i32.load offset=64
                                                                local.get $l11
                                                                i32.store
                                                                br $L4
                                                              end
                                                              local.get $l7
                                                              i32.load offset=64
                                                              local.get $l11
                                                              i64.extend_i32_s
                                                              i64.store
                                                              br $L4
                                                            end
                                                            local.get $l7
                                                            i32.load offset=64
                                                            local.get $l11
                                                            i32.store16
                                                            br $L4
                                                          end
                                                          local.get $l7
                                                          i32.load offset=64
                                                          local.get $l11
                                                          i32.store8
                                                          br $L4
                                                        end
                                                        local.get $l7
                                                        i32.load offset=64
                                                        local.get $l11
                                                        i32.store
                                                        br $L4
                                                      end
                                                      local.get $l7
                                                      i32.load offset=64
                                                      local.get $l11
                                                      i64.extend_i32_s
                                                      i64.store
                                                      br $L4
                                                    end
                                                    local.get $l20
                                                    i32.const 8
                                                    local.get $l20
                                                    i32.const 8
                                                    i32.gt_u
                                                    select
                                                    local.set $l20
                                                    local.get $l14
                                                    i32.const 8
                                                    i32.or
                                                    local.set $l14
                                                    i32.const 120
                                                    local.set $p1
                                                  end
                                                  local.get $l7
                                                  i64.load offset=64
                                                  local.get $l9
                                                  local.get $p1
                                                  i32.const 32
                                                  i32.and
                                                  call $f29
                                                  local.set $l12
                                                  i32.const 0
                                                  local.set $l17
                                                  i32.const 1024
                                                  local.set $l16
                                                  local.get $l7
                                                  i64.load offset=64
                                                  i64.eqz
                                                  br_if $B44
                                                  local.get $l14
                                                  i32.const 8
                                                  i32.and
                                                  i32.eqz
                                                  br_if $B44
                                                  local.get $p1
                                                  i32.const 4
                                                  i32.shr_u
                                                  i32.const 1024
                                                  i32.add
                                                  local.set $l16
                                                  i32.const 2
                                                  local.set $l17
                                                  br $B44
                                                end
                                                i32.const 0
                                                local.set $l17
                                                i32.const 1024
                                                local.set $l16
                                                local.get $l7
                                                i64.load offset=64
                                                local.get $l9
                                                call $f30
                                                local.set $l12
                                                local.get $l14
                                                i32.const 8
                                                i32.and
                                                i32.eqz
                                                br_if $B44
                                                local.get $l20
                                                local.get $l9
                                                local.get $l12
                                                i32.sub
                                                local.tee $p1
                                                i32.const 1
                                                i32.add
                                                local.get $l20
                                                local.get $p1
                                                i32.gt_s
                                                select
                                                local.set $l20
                                                br $B44
                                              end
                                              block $B61
                                                local.get $l7
                                                i64.load offset=64
                                                local.tee $l24
                                                i64.const -1
                                                i64.gt_s
                                                br_if $B61
                                                local.get $l7
                                                i64.const 0
                                                local.get $l24
                                                i64.sub
                                                local.tee $l24
                                                i64.store offset=64
                                                i32.const 1
                                                local.set $l17
                                                i32.const 1024
                                                local.set $l16
                                                br $B45
                                              end
                                              block $B62
                                                local.get $l14
                                                i32.const 2048
                                                i32.and
                                                i32.eqz
                                                br_if $B62
                                                i32.const 1
                                                local.set $l17
                                                i32.const 1025
                                                local.set $l16
                                                br $B45
                                              end
                                              i32.const 1026
                                              i32.const 1024
                                              local.get $l14
                                              i32.const 1
                                              i32.and
                                              local.tee $l17
                                              select
                                              local.set $l16
                                            end
                                            local.get $l24
                                            local.get $l9
                                            call $f31
                                            local.set $l12
                                          end
                                          block $B63
                                            local.get $l21
                                            i32.eqz
                                            br_if $B63
                                            local.get $l20
                                            i32.const 0
                                            i32.lt_s
                                            br_if $B3
                                          end
                                          local.get $l14
                                          i32.const -65537
                                          i32.and
                                          local.get $l14
                                          local.get $l21
                                          select
                                          local.set $l14
                                          block $B64
                                            local.get $l7
                                            i64.load offset=64
                                            local.tee $l24
                                            i64.const 0
                                            i64.ne
                                            br_if $B64
                                            local.get $l20
                                            br_if $B64
                                            local.get $l9
                                            local.set $l12
                                            local.get $l9
                                            local.set $l22
                                            i32.const 0
                                            local.set $l20
                                            br $B6
                                          end
                                          local.get $l20
                                          local.get $l9
                                          local.get $l12
                                          i32.sub
                                          local.get $l24
                                          i64.eqz
                                          i32.add
                                          local.tee $p1
                                          local.get $l20
                                          local.get $p1
                                          i32.gt_s
                                          select
                                          local.set $l20
                                          br $B7
                                        end
                                        i32.const 0
                                        local.set $l17
                                        local.get $l7
                                        i32.load offset=64
                                        local.tee $p1
                                        i32.const 1071
                                        local.get $p1
                                        select
                                        local.set $l12
                                        local.get $l12
                                        local.get $l12
                                        i32.const 2147483647
                                        local.get $l20
                                        local.get $l20
                                        i32.const 0
                                        i32.lt_s
                                        select
                                        call $f19
                                        local.tee $p1
                                        i32.add
                                        local.set $l22
                                        block $B65
                                          local.get $l20
                                          i32.const -1
                                          i32.le_s
                                          br_if $B65
                                          local.get $l23
                                          local.set $l14
                                          local.get $p1
                                          local.set $l20
                                          br $B6
                                        end
                                        local.get $l23
                                        local.set $l14
                                        local.get $p1
                                        local.set $l20
                                        local.get $l22
                                        i32.load8_u
                                        br_if $B3
                                        br $B6
                                      end
                                      block $B66
                                        local.get $l20
                                        i32.eqz
                                        br_if $B66
                                        local.get $l7
                                        i32.load offset=64
                                        local.set $l13
                                        br $B40
                                      end
                                      i32.const 0
                                      local.set $p1
                                      local.get $p0
                                      i32.const 32
                                      local.get $l19
                                      i32.const 0
                                      local.get $l14
                                      call $f32
                                      br $B39
                                    end
                                    local.get $l7
                                    i32.const 0
                                    i32.store offset=12
                                    local.get $l7
                                    local.get $l7
                                    i64.load offset=64
                                    i64.store32 offset=8
                                    local.get $l7
                                    local.get $l7
                                    i32.const 8
                                    i32.add
                                    i32.store offset=64
                                    i32.const -1
                                    local.set $l20
                                    local.get $l7
                                    i32.const 8
                                    i32.add
                                    local.set $l13
                                  end
                                  i32.const 0
                                  local.set $p1
                                  block $B67
                                    loop $L68
                                      local.get $l13
                                      i32.load
                                      local.tee $l15
                                      i32.eqz
                                      br_if $B67
                                      block $B69
                                        local.get $l7
                                        i32.const 4
                                        i32.add
                                        local.get $l15
                                        call $f43
                                        local.tee $l15
                                        i32.const 0
                                        i32.lt_s
                                        local.tee $l12
                                        br_if $B69
                                        local.get $l15
                                        local.get $l20
                                        local.get $p1
                                        i32.sub
                                        i32.gt_u
                                        br_if $B69
                                        local.get $l13
                                        i32.const 4
                                        i32.add
                                        local.set $l13
                                        local.get $l20
                                        local.get $l15
                                        local.get $p1
                                        i32.add
                                        local.tee $p1
                                        i32.gt_u
                                        br_if $L68
                                        br $B67
                                      end
                                    end
                                    local.get $l12
                                    br_if $B1
                                  end
                                  i32.const 61
                                  local.set $l22
                                  local.get $p1
                                  i32.const 0
                                  i32.lt_s
                                  br_if $B2
                                  local.get $p0
                                  i32.const 32
                                  local.get $l19
                                  local.get $p1
                                  local.get $l14
                                  call $f32
                                  block $B70
                                    local.get $p1
                                    br_if $B70
                                    i32.const 0
                                    local.set $p1
                                    br $B39
                                  end
                                  i32.const 0
                                  local.set $l15
                                  local.get $l7
                                  i32.load offset=64
                                  local.set $l13
                                  loop $L71
                                    local.get $l13
                                    i32.load
                                    local.tee $l12
                                    i32.eqz
                                    br_if $B39
                                    local.get $l7
                                    i32.const 4
                                    i32.add
                                    local.get $l12
                                    call $f43
                                    local.tee $l12
                                    local.get $l15
                                    i32.add
                                    local.tee $l15
                                    local.get $p1
                                    i32.gt_u
                                    br_if $B39
                                    local.get $p0
                                    local.get $l7
                                    i32.const 4
                                    i32.add
                                    local.get $l12
                                    call $f26
                                    local.get $l13
                                    i32.const 4
                                    i32.add
                                    local.set $l13
                                    local.get $l15
                                    local.get $p1
                                    i32.lt_u
                                    br_if $L71
                                  end
                                end
                                local.get $p0
                                i32.const 32
                                local.get $l19
                                local.get $p1
                                local.get $l14
                                i32.const 8192
                                i32.xor
                                call $f32
                                local.get $l19
                                local.get $p1
                                local.get $l19
                                local.get $p1
                                i32.gt_s
                                select
                                local.set $p1
                                br $L4
                              end
                              block $B72
                                local.get $l21
                                i32.eqz
                                br_if $B72
                                local.get $l20
                                i32.const 0
                                i32.lt_s
                                br_if $B3
                              end
                              i32.const 61
                              local.set $l22
                              local.get $p0
                              local.get $l7
                              f64.load offset=64
                              local.get $l19
                              local.get $l20
                              local.get $l14
                              local.get $p1
                              local.get $p5
                              call_indirect (type $t8) $__indirect_function_table
                              local.tee $p1
                              i32.const 0
                              i32.ge_s
                              br_if $L4
                              br $B2
                            end
                            local.get $l7
                            local.get $l7
                            i64.load offset=64
                            i64.store8 offset=55
                            i32.const 1
                            local.set $l20
                            local.get $l8
                            local.set $l12
                            local.get $l9
                            local.set $l22
                            local.get $l23
                            local.set $l14
                            br $B6
                          end
                          local.get $l7
                          local.get $p1
                          i32.const 1
                          i32.add
                          local.tee $l14
                          i32.store offset=76
                          local.get $p1
                          i32.load8_u offset=1
                          local.set $l13
                          local.get $l14
                          local.set $p1
                          br $L10
                        end
                        unreachable
                      end
                      local.get $p0
                      br_if $B0
                      local.get $l10
                      i32.eqz
                      br_if $B5
                      i32.const 1
                      local.set $p1
                      block $B73
                        loop $L74
                          local.get $p4
                          local.get $p1
                          i32.const 2
                          i32.shl
                          i32.add
                          i32.load
                          local.tee $l13
                          i32.eqz
                          br_if $B73
                          local.get $p3
                          local.get $p1
                          i32.const 3
                          i32.shl
                          i32.add
                          local.get $l13
                          local.get $p2
                          local.get $p6
                          call $f28
                          i32.const 1
                          local.set $l11
                          local.get $p1
                          i32.const 1
                          i32.add
                          local.tee $p1
                          i32.const 10
                          i32.ne
                          br_if $L74
                          br $B0
                        end
                        unreachable
                      end
                      i32.const 1
                      local.set $l11
                      local.get $p1
                      i32.const 10
                      i32.ge_u
                      br_if $B0
                      loop $L75
                        local.get $p4
                        local.get $p1
                        i32.const 2
                        i32.shl
                        i32.add
                        i32.load
                        br_if $B8
                        i32.const 1
                        local.set $l11
                        local.get $p1
                        i32.const 1
                        i32.add
                        local.tee $p1
                        i32.const 10
                        i32.eq
                        br_if $B0
                        br $L75
                      end
                      unreachable
                    end
                    i32.const 28
                    local.set $l22
                    br $B2
                  end
                  local.get $l9
                  local.set $l22
                end
                local.get $l22
                local.get $l12
                i32.sub
                local.tee $l18
                local.get $l20
                local.get $l20
                local.get $l18
                i32.lt_s
                select
                local.tee $l20
                i32.const 2147483647
                local.get $l17
                i32.sub
                i32.gt_s
                br_if $B3
                i32.const 61
                local.set $l22
                local.get $l17
                local.get $l20
                i32.add
                local.tee $l15
                local.get $l19
                local.get $l19
                local.get $l15
                i32.lt_s
                select
                local.tee $p1
                local.get $l13
                i32.gt_s
                br_if $B2
                local.get $p0
                i32.const 32
                local.get $p1
                local.get $l15
                local.get $l14
                call $f32
                local.get $p0
                local.get $l16
                local.get $l17
                call $f26
                local.get $p0
                i32.const 48
                local.get $p1
                local.get $l15
                local.get $l14
                i32.const 65536
                i32.xor
                call $f32
                local.get $p0
                i32.const 48
                local.get $l20
                local.get $l18
                i32.const 0
                call $f32
                local.get $p0
                local.get $l12
                local.get $l18
                call $f26
                local.get $p0
                i32.const 32
                local.get $p1
                local.get $l15
                local.get $l14
                i32.const 8192
                i32.xor
                call $f32
                br $L4
              end
            end
            i32.const 0
            local.set $l11
            br $B0
          end
          i32.const 61
          local.set $l22
        end
        call $__errno_location
        local.get $l22
        i32.store
      end
      i32.const -1
      local.set $l11
    end
    local.get $l7
    i32.const 80
    i32.add
    global.set $g0
    local.get $l11)
  (func $f26 (type $t15) (param $p0 i32) (param $p1 i32) (param $p2 i32)
    block $B0
      local.get $p0
      i32.load8_u
      i32.const 32
      i32.and
      br_if $B0
      local.get $p1
      local.get $p2
      local.get $p0
      call $f23
      drop
    end)
  (func $f27 (type $t2) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32)
    i32.const 0
    local.set $l1
    block $B0
      local.get $p0
      i32.load
      i32.load8_s
      call $f17
      br_if $B0
      i32.const 0
      return
    end
    loop $L1
      local.get $p0
      i32.load
      local.set $l2
      i32.const -1
      local.set $l3
      block $B2
        local.get $l1
        i32.const 214748364
        i32.gt_u
        br_if $B2
        i32.const -1
        local.get $l2
        i32.load8_s
        i32.const -48
        i32.add
        local.tee $l3
        local.get $l1
        i32.const 10
        i32.mul
        local.tee $l1
        i32.add
        local.get $l3
        i32.const 2147483647
        local.get $l1
        i32.sub
        i32.gt_s
        select
        local.set $l3
      end
      local.get $p0
      local.get $l2
      i32.const 1
      i32.add
      i32.store
      local.get $l3
      local.set $l1
      local.get $l2
      i32.load8_s offset=1
      call $f17
      br_if $L1
    end
    local.get $l3)
  (func $f28 (type $t16) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32)
    block $B0
      block $B1
        block $B2
          block $B3
            block $B4
              block $B5
                block $B6
                  block $B7
                    block $B8
                      block $B9
                        block $B10
                          block $B11
                            block $B12
                              block $B13
                                block $B14
                                  block $B15
                                    block $B16
                                      block $B17
                                        block $B18
                                          local.get $p1
                                          i32.const -9
                                          i32.add
                                          br_table $B18 $B17 $B16 $B13 $B15 $B14 $B12 $B11 $B10 $B9 $B8 $B7 $B6 $B5 $B4 $B3 $B2 $B1 $B0
                                        end
                                        local.get $p2
                                        local.get $p2
                                        i32.load
                                        local.tee $p1
                                        i32.const 4
                                        i32.add
                                        i32.store
                                        local.get $p0
                                        local.get $p1
                                        i32.load
                                        i32.store
                                        return
                                      end
                                      local.get $p2
                                      local.get $p2
                                      i32.load
                                      local.tee $p1
                                      i32.const 4
                                      i32.add
                                      i32.store
                                      local.get $p0
                                      local.get $p1
                                      i64.load32_s
                                      i64.store
                                      return
                                    end
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p0
                                    local.get $p1
                                    i64.load32_u
                                    i64.store
                                    return
                                  end
                                  local.get $p2
                                  local.get $p2
                                  i32.load
                                  local.tee $p1
                                  i32.const 4
                                  i32.add
                                  i32.store
                                  local.get $p0
                                  local.get $p1
                                  i64.load32_s
                                  i64.store
                                  return
                                end
                                local.get $p2
                                local.get $p2
                                i32.load
                                local.tee $p1
                                i32.const 4
                                i32.add
                                i32.store
                                local.get $p0
                                local.get $p1
                                i64.load32_u
                                i64.store
                                return
                              end
                              local.get $p2
                              local.get $p2
                              i32.load
                              i32.const 7
                              i32.add
                              i32.const -8
                              i32.and
                              local.tee $p1
                              i32.const 8
                              i32.add
                              i32.store
                              local.get $p0
                              local.get $p1
                              i64.load
                              i64.store
                              return
                            end
                            local.get $p2
                            local.get $p2
                            i32.load
                            local.tee $p1
                            i32.const 4
                            i32.add
                            i32.store
                            local.get $p0
                            local.get $p1
                            i64.load16_s
                            i64.store
                            return
                          end
                          local.get $p2
                          local.get $p2
                          i32.load
                          local.tee $p1
                          i32.const 4
                          i32.add
                          i32.store
                          local.get $p0
                          local.get $p1
                          i64.load16_u
                          i64.store
                          return
                        end
                        local.get $p2
                        local.get $p2
                        i32.load
                        local.tee $p1
                        i32.const 4
                        i32.add
                        i32.store
                        local.get $p0
                        local.get $p1
                        i64.load8_s
                        i64.store
                        return
                      end
                      local.get $p2
                      local.get $p2
                      i32.load
                      local.tee $p1
                      i32.const 4
                      i32.add
                      i32.store
                      local.get $p0
                      local.get $p1
                      i64.load8_u
                      i64.store
                      return
                    end
                    local.get $p2
                    local.get $p2
                    i32.load
                    i32.const 7
                    i32.add
                    i32.const -8
                    i32.and
                    local.tee $p1
                    i32.const 8
                    i32.add
                    i32.store
                    local.get $p0
                    local.get $p1
                    i64.load
                    i64.store
                    return
                  end
                  local.get $p2
                  local.get $p2
                  i32.load
                  local.tee $p1
                  i32.const 4
                  i32.add
                  i32.store
                  local.get $p0
                  local.get $p1
                  i64.load32_u
                  i64.store
                  return
                end
                local.get $p2
                local.get $p2
                i32.load
                i32.const 7
                i32.add
                i32.const -8
                i32.and
                local.tee $p1
                i32.const 8
                i32.add
                i32.store
                local.get $p0
                local.get $p1
                i64.load
                i64.store
                return
              end
              local.get $p2
              local.get $p2
              i32.load
              i32.const 7
              i32.add
              i32.const -8
              i32.and
              local.tee $p1
              i32.const 8
              i32.add
              i32.store
              local.get $p0
              local.get $p1
              i64.load
              i64.store
              return
            end
            local.get $p2
            local.get $p2
            i32.load
            local.tee $p1
            i32.const 4
            i32.add
            i32.store
            local.get $p0
            local.get $p1
            i64.load32_s
            i64.store
            return
          end
          local.get $p2
          local.get $p2
          i32.load
          local.tee $p1
          i32.const 4
          i32.add
          i32.store
          local.get $p0
          local.get $p1
          i64.load32_u
          i64.store
          return
        end
        local.get $p2
        local.get $p2
        i32.load
        i32.const 7
        i32.add
        i32.const -8
        i32.and
        local.tee $p1
        i32.const 8
        i32.add
        i32.store
        local.get $p0
        local.get $p1
        f64.load
        f64.store
        return
      end
      local.get $p0
      local.get $p2
      local.get $p3
      call_indirect (type $t9) $__indirect_function_table
    end)
  (func $f29 (type $t17) (param $p0 i64) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32)
    block $B0
      local.get $p0
      i64.eqz
      br_if $B0
      loop $L1
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        i32.wrap_i64
        i32.const 15
        i32.and
        i32.const 1568
        i32.add
        i32.load8_u
        local.get $p2
        i32.or
        i32.store8
        local.get $p0
        i64.const 15
        i64.gt_u
        local.set $l3
        local.get $p0
        i64.const 4
        i64.shr_u
        local.set $p0
        local.get $l3
        br_if $L1
      end
    end
    local.get $p1)
  (func $f30 (type $t10) (param $p0 i64) (param $p1 i32) (result i32)
    (local $l2 i32)
    block $B0
      local.get $p0
      i64.eqz
      br_if $B0
      loop $L1
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        i32.wrap_i64
        i32.const 7
        i32.and
        i32.const 48
        i32.or
        i32.store8
        local.get $p0
        i64.const 7
        i64.gt_u
        local.set $l2
        local.get $p0
        i64.const 3
        i64.shr_u
        local.set $p0
        local.get $l2
        br_if $L1
      end
    end
    local.get $p1)
  (func $f31 (type $t10) (param $p0 i64) (param $p1 i32) (result i32)
    (local $l2 i64) (local $l3 i32) (local $l4 i32) (local $l5 i32)
    block $B0
      block $B1
        local.get $p0
        i64.const 4294967296
        i64.ge_u
        br_if $B1
        local.get $p0
        local.set $l2
        br $B0
      end
      loop $L2
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        local.get $p0
        i64.const 10
        i64.div_u
        local.tee $l2
        i64.const 10
        i64.mul
        i64.sub
        i32.wrap_i64
        i32.const 48
        i32.or
        i32.store8
        local.get $p0
        i64.const 42949672959
        i64.gt_u
        local.set $l3
        local.get $l2
        local.set $p0
        local.get $l3
        br_if $L2
      end
    end
    block $B3
      local.get $l2
      i32.wrap_i64
      local.tee $l3
      i32.eqz
      br_if $B3
      loop $L4
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $l3
        local.get $l3
        i32.const 10
        i32.div_u
        local.tee $l4
        i32.const 10
        i32.mul
        i32.sub
        i32.const 48
        i32.or
        i32.store8
        local.get $l3
        i32.const 9
        i32.gt_u
        local.set $l5
        local.get $l4
        local.set $l3
        local.get $l5
        br_if $L4
      end
    end
    local.get $p1)
  (func $f32 (type $t18) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32)
    (local $l5 i32)
    global.get $g0
    i32.const 256
    i32.sub
    local.tee $l5
    global.set $g0
    block $B0
      local.get $p2
      local.get $p3
      i32.le_s
      br_if $B0
      local.get $p4
      i32.const 73728
      i32.and
      br_if $B0
      local.get $l5
      local.get $p1
      i32.const 255
      i32.and
      local.get $p2
      local.get $p3
      i32.sub
      local.tee $p2
      i32.const 256
      local.get $p2
      i32.const 256
      i32.lt_u
      local.tee $p3
      select
      call $f9
      drop
      block $B1
        local.get $p3
        br_if $B1
        loop $L2
          local.get $p0
          local.get $l5
          i32.const 256
          call $f26
          local.get $p2
          i32.const -256
          i32.add
          local.tee $p2
          i32.const 255
          i32.gt_u
          br_if $L2
        end
      end
      local.get $p0
      local.get $l5
      local.get $p2
      call $f26
    end
    local.get $l5
    i32.const 256
    i32.add
    global.set $g0)
  (func $f33 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    local.get $p0
    local.get $p1
    local.get $p2
    i32.const 4
    i32.const 5
    call $f24)
  (func $f34 (type $t8) (param $p0 i32) (param $p1 f64) (param $p2 i32) (param $p3 i32) (param $p4 i32) (param $p5 i32) (result i32)
    (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i64) (local $l25 i64) (local $l26 f64)
    global.get $g0
    i32.const 560
    i32.sub
    local.tee $l6
    global.set $g0
    i32.const 0
    local.set $l7
    local.get $l6
    i32.const 0
    i32.store offset=44
    block $B0
      block $B1
        local.get $p1
        call $f36
        local.tee $l24
        i64.const -1
        i64.gt_s
        br_if $B1
        i32.const 1
        local.set $l8
        i32.const 1034
        local.set $l9
        local.get $p1
        f64.neg
        local.tee $p1
        call $f36
        local.set $l24
        br $B0
      end
      block $B2
        local.get $p4
        i32.const 2048
        i32.and
        i32.eqz
        br_if $B2
        i32.const 1
        local.set $l8
        i32.const 1037
        local.set $l9
        br $B0
      end
      i32.const 1040
      i32.const 1035
      local.get $p4
      i32.const 1
      i32.and
      local.tee $l8
      select
      local.set $l9
      local.get $l8
      i32.eqz
      local.set $l7
    end
    block $B3
      block $B4
        local.get $l24
        i64.const 9218868437227405312
        i64.and
        i64.const 9218868437227405312
        i64.ne
        br_if $B4
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l8
        i32.const 3
        i32.add
        local.tee $l10
        local.get $p4
        i32.const -65537
        i32.and
        call $f32
        local.get $p0
        local.get $l9
        local.get $l8
        call $f26
        local.get $p0
        i32.const 1053
        i32.const 1061
        local.get $p5
        i32.const 32
        i32.and
        local.tee $l11
        select
        i32.const 1057
        i32.const 1065
        local.get $l11
        select
        local.get $p1
        local.get $p1
        f64.ne
        select
        i32.const 3
        call $f26
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l10
        local.get $p4
        i32.const 8192
        i32.xor
        call $f32
        local.get $p2
        local.get $l10
        local.get $l10
        local.get $p2
        i32.lt_s
        select
        local.set $l12
        br $B3
      end
      local.get $l6
      i32.const 16
      i32.add
      local.set $l13
      block $B5
        block $B6
          block $B7
            block $B8
              local.get $p1
              local.get $l6
              i32.const 44
              i32.add
              call $f21
              local.tee $p1
              local.get $p1
              f64.add
              local.tee $p1
              f64.const 0x0p+0 (;=0;)
              f64.eq
              br_if $B8
              local.get $l6
              local.get $l6
              i32.load offset=44
              local.tee $l10
              i32.const -1
              i32.add
              i32.store offset=44
              local.get $p5
              i32.const 32
              i32.or
              local.tee $l14
              i32.const 97
              i32.ne
              br_if $B7
              br $B5
            end
            local.get $p5
            i32.const 32
            i32.or
            local.tee $l14
            i32.const 97
            i32.eq
            br_if $B5
            i32.const 6
            local.get $p3
            local.get $p3
            i32.const 0
            i32.lt_s
            select
            local.set $l15
            local.get $l6
            i32.load offset=44
            local.set $l16
            br $B6
          end
          local.get $l6
          local.get $l10
          i32.const -29
          i32.add
          local.tee $l16
          i32.store offset=44
          i32.const 6
          local.get $p3
          local.get $p3
          i32.const 0
          i32.lt_s
          select
          local.set $l15
          local.get $p1
          f64.const 0x1p+28 (;=2.68435e+08;)
          f64.mul
          local.set $p1
        end
        local.get $l6
        i32.const 48
        i32.add
        local.get $l6
        i32.const 336
        i32.add
        local.get $l16
        i32.const 0
        i32.lt_s
        select
        local.tee $l17
        local.set $l11
        loop $L9
          block $B10
            block $B11
              local.get $p1
              f64.const 0x1p+32 (;=4.29497e+09;)
              f64.lt
              local.get $p1
              f64.const 0x0p+0 (;=0;)
              f64.ge
              i32.and
              i32.eqz
              br_if $B11
              local.get $p1
              i32.trunc_f64_u
              local.set $l10
              br $B10
            end
            i32.const 0
            local.set $l10
          end
          local.get $l11
          local.get $l10
          i32.store
          local.get $l11
          i32.const 4
          i32.add
          local.set $l11
          local.get $p1
          local.get $l10
          f64.convert_i32_u
          f64.sub
          f64.const 0x1.dcd65p+29 (;=1e+09;)
          f64.mul
          local.tee $p1
          f64.const 0x0p+0 (;=0;)
          f64.ne
          br_if $L9
        end
        block $B12
          block $B13
            local.get $l16
            i32.const 1
            i32.ge_s
            br_if $B13
            local.get $l16
            local.set $p3
            local.get $l11
            local.set $l10
            local.get $l17
            local.set $l18
            br $B12
          end
          local.get $l17
          local.set $l18
          local.get $l16
          local.set $p3
          loop $L14
            local.get $p3
            i32.const 29
            local.get $p3
            i32.const 29
            i32.lt_u
            select
            local.set $p3
            block $B15
              local.get $l11
              i32.const -4
              i32.add
              local.tee $l10
              local.get $l18
              i32.lt_u
              br_if $B15
              local.get $p3
              i64.extend_i32_u
              local.set $l25
              i64.const 0
              local.set $l24
              loop $L16
                local.get $l10
                local.get $l10
                i64.load32_u
                local.get $l25
                i64.shl
                local.get $l24
                i64.const 4294967295
                i64.and
                i64.add
                local.tee $l24
                local.get $l24
                i64.const 1000000000
                i64.div_u
                local.tee $l24
                i64.const 1000000000
                i64.mul
                i64.sub
                i64.store32
                local.get $l10
                i32.const -4
                i32.add
                local.tee $l10
                local.get $l18
                i32.ge_u
                br_if $L16
              end
              local.get $l24
              i32.wrap_i64
              local.tee $l10
              i32.eqz
              br_if $B15
              local.get $l18
              i32.const -4
              i32.add
              local.tee $l18
              local.get $l10
              i32.store
            end
            block $B17
              loop $L18
                local.get $l11
                local.tee $l10
                local.get $l18
                i32.le_u
                br_if $B17
                local.get $l10
                i32.const -4
                i32.add
                local.tee $l11
                i32.load
                i32.eqz
                br_if $L18
              end
            end
            local.get $l6
            local.get $l6
            i32.load offset=44
            local.get $p3
            i32.sub
            local.tee $p3
            i32.store offset=44
            local.get $l10
            local.set $l11
            local.get $p3
            i32.const 0
            i32.gt_s
            br_if $L14
          end
        end
        local.get $l15
        i32.const 25
        i32.add
        i32.const 9
        i32.div_u
        local.set $l11
        block $B19
          local.get $p3
          i32.const -1
          i32.gt_s
          br_if $B19
          local.get $l11
          i32.const 1
          i32.add
          local.set $l19
          local.get $l14
          i32.const 102
          i32.eq
          local.set $l20
          loop $L20
            i32.const 0
            local.get $p3
            i32.sub
            local.tee $l11
            i32.const 9
            local.get $l11
            i32.const 9
            i32.lt_u
            select
            local.set $l21
            block $B21
              block $B22
                local.get $l18
                local.get $l10
                i32.ge_u
                br_if $B22
                i32.const 1000000000
                local.get $l21
                i32.shr_u
                local.set $l22
                i32.const -1
                local.get $l21
                i32.shl
                i32.const -1
                i32.xor
                local.set $l23
                i32.const 0
                local.set $p3
                local.get $l18
                local.set $l11
                loop $L23
                  local.get $l11
                  local.get $l11
                  i32.load
                  local.tee $l12
                  local.get $l21
                  i32.shr_u
                  local.get $p3
                  i32.add
                  i32.store
                  local.get $l12
                  local.get $l23
                  i32.and
                  local.get $l22
                  i32.mul
                  local.set $p3
                  local.get $l11
                  i32.const 4
                  i32.add
                  local.tee $l11
                  local.get $l10
                  i32.lt_u
                  br_if $L23
                end
                local.get $l18
                i32.load
                local.set $l11
                local.get $p3
                i32.eqz
                br_if $B21
                local.get $l10
                local.get $p3
                i32.store
                local.get $l10
                i32.const 4
                i32.add
                local.set $l10
                br $B21
              end
              local.get $l18
              i32.load
              local.set $l11
            end
            local.get $l6
            local.get $l6
            i32.load offset=44
            local.get $l21
            i32.add
            local.tee $p3
            i32.store offset=44
            local.get $l17
            local.get $l18
            local.get $l11
            i32.eqz
            i32.const 2
            i32.shl
            i32.add
            local.tee $l18
            local.get $l20
            select
            local.tee $l11
            local.get $l19
            i32.const 2
            i32.shl
            i32.add
            local.get $l10
            local.get $l10
            local.get $l11
            i32.sub
            i32.const 2
            i32.shr_s
            local.get $l19
            i32.gt_s
            select
            local.set $l10
            local.get $p3
            i32.const 0
            i32.lt_s
            br_if $L20
          end
        end
        i32.const 0
        local.set $p3
        block $B24
          local.get $l18
          local.get $l10
          i32.ge_u
          br_if $B24
          local.get $l17
          local.get $l18
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          local.set $p3
          i32.const 10
          local.set $l11
          local.get $l18
          i32.load
          local.tee $l12
          i32.const 10
          i32.lt_u
          br_if $B24
          loop $L25
            local.get $p3
            i32.const 1
            i32.add
            local.set $p3
            local.get $l12
            local.get $l11
            i32.const 10
            i32.mul
            local.tee $l11
            i32.ge_u
            br_if $L25
          end
        end
        block $B26
          local.get $l15
          i32.const 0
          local.get $p3
          local.get $l14
          i32.const 102
          i32.eq
          select
          i32.sub
          local.get $l15
          i32.const 0
          i32.ne
          local.get $l14
          i32.const 103
          i32.eq
          i32.and
          i32.sub
          local.tee $l11
          local.get $l10
          local.get $l17
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          i32.const -9
          i32.add
          i32.ge_s
          br_if $B26
          local.get $l11
          i32.const 9216
          i32.add
          local.tee $l12
          i32.const 9
          i32.div_s
          local.tee $l22
          i32.const 2
          i32.shl
          local.get $l6
          i32.const 48
          i32.add
          i32.const 4
          i32.const 292
          local.get $l16
          i32.const 0
          i32.lt_s
          select
          i32.add
          i32.add
          i32.const -4096
          i32.add
          local.set $l21
          i32.const 10
          local.set $l11
          block $B27
            local.get $l12
            local.get $l22
            i32.const 9
            i32.mul
            i32.sub
            local.tee $l12
            i32.const 7
            i32.gt_s
            br_if $B27
            loop $L28
              local.get $l11
              i32.const 10
              i32.mul
              local.set $l11
              local.get $l12
              i32.const 1
              i32.add
              local.tee $l12
              i32.const 8
              i32.ne
              br_if $L28
            end
          end
          local.get $l21
          i32.const 4
          i32.add
          local.set $l23
          block $B29
            block $B30
              local.get $l21
              i32.load
              local.tee $l12
              local.get $l12
              local.get $l11
              i32.div_u
              local.tee $l19
              local.get $l11
              i32.mul
              i32.sub
              local.tee $l22
              br_if $B30
              local.get $l23
              local.get $l10
              i32.eq
              br_if $B29
            end
            block $B31
              block $B32
                local.get $l19
                i32.const 1
                i32.and
                br_if $B32
                f64.const 0x1p+53 (;=9.0072e+15;)
                local.set $p1
                local.get $l11
                i32.const 1000000000
                i32.ne
                br_if $B31
                local.get $l21
                local.get $l18
                i32.le_u
                br_if $B31
                local.get $l21
                i32.const -4
                i32.add
                i32.load8_u
                i32.const 1
                i32.and
                i32.eqz
                br_if $B31
              end
              f64.const 0x1.0000000000001p+53 (;=9.0072e+15;)
              local.set $p1
            end
            f64.const 0x1p-1 (;=0.5;)
            f64.const 0x1p+0 (;=1;)
            f64.const 0x1.8p+0 (;=1.5;)
            local.get $l23
            local.get $l10
            i32.eq
            select
            f64.const 0x1.8p+0 (;=1.5;)
            local.get $l22
            local.get $l11
            i32.const 1
            i32.shr_u
            local.tee $l23
            i32.eq
            select
            local.get $l22
            local.get $l23
            i32.lt_u
            select
            local.set $l26
            block $B33
              local.get $l7
              br_if $B33
              local.get $l9
              i32.load8_u
              i32.const 45
              i32.ne
              br_if $B33
              local.get $l26
              f64.neg
              local.set $l26
              local.get $p1
              f64.neg
              local.set $p1
            end
            local.get $l21
            local.get $l12
            local.get $l22
            i32.sub
            local.tee $l12
            i32.store
            local.get $p1
            local.get $l26
            f64.add
            local.get $p1
            f64.eq
            br_if $B29
            local.get $l21
            local.get $l12
            local.get $l11
            i32.add
            local.tee $l11
            i32.store
            block $B34
              local.get $l11
              i32.const 1000000000
              i32.lt_u
              br_if $B34
              loop $L35
                local.get $l21
                i32.const 0
                i32.store
                block $B36
                  local.get $l21
                  i32.const -4
                  i32.add
                  local.tee $l21
                  local.get $l18
                  i32.ge_u
                  br_if $B36
                  local.get $l18
                  i32.const -4
                  i32.add
                  local.tee $l18
                  i32.const 0
                  i32.store
                end
                local.get $l21
                local.get $l21
                i32.load
                i32.const 1
                i32.add
                local.tee $l11
                i32.store
                local.get $l11
                i32.const 999999999
                i32.gt_u
                br_if $L35
              end
            end
            local.get $l17
            local.get $l18
            i32.sub
            i32.const 2
            i32.shr_s
            i32.const 9
            i32.mul
            local.set $p3
            i32.const 10
            local.set $l11
            local.get $l18
            i32.load
            local.tee $l12
            i32.const 10
            i32.lt_u
            br_if $B29
            loop $L37
              local.get $p3
              i32.const 1
              i32.add
              local.set $p3
              local.get $l12
              local.get $l11
              i32.const 10
              i32.mul
              local.tee $l11
              i32.ge_u
              br_if $L37
            end
          end
          local.get $l21
          i32.const 4
          i32.add
          local.tee $l11
          local.get $l10
          local.get $l10
          local.get $l11
          i32.gt_u
          select
          local.set $l10
        end
        block $B38
          loop $L39
            local.get $l10
            local.tee $l11
            local.get $l18
            i32.le_u
            local.tee $l12
            br_if $B38
            local.get $l11
            i32.const -4
            i32.add
            local.tee $l10
            i32.load
            i32.eqz
            br_if $L39
          end
        end
        block $B40
          block $B41
            local.get $l14
            i32.const 103
            i32.eq
            br_if $B41
            local.get $p4
            i32.const 8
            i32.and
            local.set $l21
            br $B40
          end
          local.get $p3
          i32.const -1
          i32.xor
          i32.const -1
          local.get $l15
          i32.const 1
          local.get $l15
          select
          local.tee $l10
          local.get $p3
          i32.gt_s
          local.get $p3
          i32.const -5
          i32.gt_s
          i32.and
          local.tee $l21
          select
          local.get $l10
          i32.add
          local.set $l15
          i32.const -1
          i32.const -2
          local.get $l21
          select
          local.get $p5
          i32.add
          local.set $p5
          local.get $p4
          i32.const 8
          i32.and
          local.tee $l21
          br_if $B40
          i32.const -9
          local.set $l10
          block $B42
            local.get $l12
            br_if $B42
            local.get $l11
            i32.const -4
            i32.add
            i32.load
            local.tee $l21
            i32.eqz
            br_if $B42
            i32.const 10
            local.set $l12
            i32.const 0
            local.set $l10
            local.get $l21
            i32.const 10
            i32.rem_u
            br_if $B42
            loop $L43
              local.get $l10
              local.tee $l22
              i32.const 1
              i32.add
              local.set $l10
              local.get $l21
              local.get $l12
              i32.const 10
              i32.mul
              local.tee $l12
              i32.rem_u
              i32.eqz
              br_if $L43
            end
            local.get $l22
            i32.const -1
            i32.xor
            local.set $l10
          end
          local.get $l11
          local.get $l17
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          local.set $l12
          block $B44
            local.get $p5
            i32.const -33
            i32.and
            i32.const 70
            i32.ne
            br_if $B44
            i32.const 0
            local.set $l21
            local.get $l15
            local.get $l12
            local.get $l10
            i32.add
            i32.const -9
            i32.add
            local.tee $l10
            i32.const 0
            local.get $l10
            i32.const 0
            i32.gt_s
            select
            local.tee $l10
            local.get $l15
            local.get $l10
            i32.lt_s
            select
            local.set $l15
            br $B40
          end
          i32.const 0
          local.set $l21
          local.get $l15
          local.get $p3
          local.get $l12
          i32.add
          local.get $l10
          i32.add
          i32.const -9
          i32.add
          local.tee $l10
          i32.const 0
          local.get $l10
          i32.const 0
          i32.gt_s
          select
          local.tee $l10
          local.get $l15
          local.get $l10
          i32.lt_s
          select
          local.set $l15
        end
        i32.const -1
        local.set $l12
        local.get $l15
        i32.const 2147483645
        i32.const 2147483646
        local.get $l15
        local.get $l21
        i32.or
        local.tee $l22
        select
        i32.gt_s
        br_if $B3
        local.get $l15
        local.get $l22
        i32.const 0
        i32.ne
        i32.add
        i32.const 1
        i32.add
        local.set $l23
        block $B45
          block $B46
            local.get $p5
            i32.const -33
            i32.and
            local.tee $l20
            i32.const 70
            i32.ne
            br_if $B46
            local.get $p3
            i32.const 2147483647
            local.get $l23
            i32.sub
            i32.gt_s
            br_if $B3
            local.get $p3
            i32.const 0
            local.get $p3
            i32.const 0
            i32.gt_s
            select
            local.set $l10
            br $B45
          end
          block $B47
            local.get $l13
            local.get $p3
            local.get $p3
            i32.const 31
            i32.shr_s
            local.tee $l10
            i32.add
            local.get $l10
            i32.xor
            i64.extend_i32_u
            local.get $l13
            call $f31
            local.tee $l10
            i32.sub
            i32.const 1
            i32.gt_s
            br_if $B47
            loop $L48
              local.get $l10
              i32.const -1
              i32.add
              local.tee $l10
              i32.const 48
              i32.store8
              local.get $l13
              local.get $l10
              i32.sub
              i32.const 2
              i32.lt_s
              br_if $L48
            end
          end
          local.get $l10
          i32.const -2
          i32.add
          local.tee $l19
          local.get $p5
          i32.store8
          i32.const -1
          local.set $l12
          local.get $l10
          i32.const -1
          i32.add
          i32.const 45
          i32.const 43
          local.get $p3
          i32.const 0
          i32.lt_s
          select
          i32.store8
          local.get $l13
          local.get $l19
          i32.sub
          local.tee $l10
          i32.const 2147483647
          local.get $l23
          i32.sub
          i32.gt_s
          br_if $B3
        end
        i32.const -1
        local.set $l12
        local.get $l10
        local.get $l23
        i32.add
        local.tee $l10
        local.get $l8
        i32.const 2147483647
        i32.xor
        i32.gt_s
        br_if $B3
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l10
        local.get $l8
        i32.add
        local.tee $l23
        local.get $p4
        call $f32
        local.get $p0
        local.get $l9
        local.get $l8
        call $f26
        local.get $p0
        i32.const 48
        local.get $p2
        local.get $l23
        local.get $p4
        i32.const 65536
        i32.xor
        call $f32
        block $B49
          block $B50
            block $B51
              block $B52
                local.get $l20
                i32.const 70
                i32.ne
                br_if $B52
                local.get $l6
                i32.const 16
                i32.add
                i32.const 8
                i32.or
                local.set $l21
                local.get $l6
                i32.const 16
                i32.add
                i32.const 9
                i32.or
                local.set $p3
                local.get $l17
                local.get $l18
                local.get $l18
                local.get $l17
                i32.gt_u
                select
                local.tee $l12
                local.set $l18
                loop $L53
                  local.get $l18
                  i64.load32_u
                  local.get $p3
                  call $f31
                  local.set $l10
                  block $B54
                    block $B55
                      local.get $l18
                      local.get $l12
                      i32.eq
                      br_if $B55
                      local.get $l10
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.le_u
                      br_if $B54
                      loop $L56
                        local.get $l10
                        i32.const -1
                        i32.add
                        local.tee $l10
                        i32.const 48
                        i32.store8
                        local.get $l10
                        local.get $l6
                        i32.const 16
                        i32.add
                        i32.gt_u
                        br_if $L56
                        br $B54
                      end
                      unreachable
                    end
                    local.get $l10
                    local.get $p3
                    i32.ne
                    br_if $B54
                    local.get $l6
                    i32.const 48
                    i32.store8 offset=24
                    local.get $l21
                    local.set $l10
                  end
                  local.get $p0
                  local.get $l10
                  local.get $p3
                  local.get $l10
                  i32.sub
                  call $f26
                  local.get $l18
                  i32.const 4
                  i32.add
                  local.tee $l18
                  local.get $l17
                  i32.le_u
                  br_if $L53
                end
                block $B57
                  local.get $l22
                  i32.eqz
                  br_if $B57
                  local.get $p0
                  i32.const 1069
                  i32.const 1
                  call $f26
                end
                local.get $l18
                local.get $l11
                i32.ge_u
                br_if $B51
                local.get $l15
                i32.const 1
                i32.lt_s
                br_if $B51
                loop $L58
                  block $B59
                    local.get $l18
                    i64.load32_u
                    local.get $p3
                    call $f31
                    local.tee $l10
                    local.get $l6
                    i32.const 16
                    i32.add
                    i32.le_u
                    br_if $B59
                    loop $L60
                      local.get $l10
                      i32.const -1
                      i32.add
                      local.tee $l10
                      i32.const 48
                      i32.store8
                      local.get $l10
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.gt_u
                      br_if $L60
                    end
                  end
                  local.get $p0
                  local.get $l10
                  local.get $l15
                  i32.const 9
                  local.get $l15
                  i32.const 9
                  i32.lt_s
                  select
                  call $f26
                  local.get $l15
                  i32.const -9
                  i32.add
                  local.set $l10
                  local.get $l18
                  i32.const 4
                  i32.add
                  local.tee $l18
                  local.get $l11
                  i32.ge_u
                  br_if $B50
                  local.get $l15
                  i32.const 9
                  i32.gt_s
                  local.set $l12
                  local.get $l10
                  local.set $l15
                  local.get $l12
                  br_if $L58
                  br $B50
                end
                unreachable
              end
              block $B61
                local.get $l15
                i32.const 0
                i32.lt_s
                br_if $B61
                local.get $l11
                local.get $l18
                i32.const 4
                i32.add
                local.get $l11
                local.get $l18
                i32.gt_u
                select
                local.set $l22
                local.get $l6
                i32.const 16
                i32.add
                i32.const 9
                i32.or
                local.set $p3
                local.get $l6
                i32.const 16
                i32.add
                i32.const 8
                i32.or
                local.set $l17
                local.get $l18
                local.set $l11
                loop $L62
                  block $B63
                    local.get $l11
                    i64.load32_u
                    local.get $p3
                    call $f31
                    local.tee $l10
                    local.get $p3
                    i32.ne
                    br_if $B63
                    local.get $l6
                    i32.const 48
                    i32.store8 offset=24
                    local.get $l17
                    local.set $l10
                  end
                  block $B64
                    block $B65
                      local.get $l11
                      local.get $l18
                      i32.eq
                      br_if $B65
                      local.get $l10
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.le_u
                      br_if $B64
                      loop $L66
                        local.get $l10
                        i32.const -1
                        i32.add
                        local.tee $l10
                        i32.const 48
                        i32.store8
                        local.get $l10
                        local.get $l6
                        i32.const 16
                        i32.add
                        i32.gt_u
                        br_if $L66
                        br $B64
                      end
                      unreachable
                    end
                    local.get $p0
                    local.get $l10
                    i32.const 1
                    call $f26
                    local.get $l10
                    i32.const 1
                    i32.add
                    local.set $l10
                    local.get $l15
                    local.get $l21
                    i32.or
                    i32.eqz
                    br_if $B64
                    local.get $p0
                    i32.const 1069
                    i32.const 1
                    call $f26
                  end
                  local.get $p0
                  local.get $l10
                  local.get $p3
                  local.get $l10
                  i32.sub
                  local.tee $l12
                  local.get $l15
                  local.get $l15
                  local.get $l12
                  i32.gt_s
                  select
                  call $f26
                  local.get $l15
                  local.get $l12
                  i32.sub
                  local.set $l15
                  local.get $l11
                  i32.const 4
                  i32.add
                  local.tee $l11
                  local.get $l22
                  i32.ge_u
                  br_if $B61
                  local.get $l15
                  i32.const -1
                  i32.gt_s
                  br_if $L62
                end
              end
              local.get $p0
              i32.const 48
              local.get $l15
              i32.const 18
              i32.add
              i32.const 18
              i32.const 0
              call $f32
              local.get $p0
              local.get $l19
              local.get $l13
              local.get $l19
              i32.sub
              call $f26
              br $B49
            end
            local.get $l15
            local.set $l10
          end
          local.get $p0
          i32.const 48
          local.get $l10
          i32.const 9
          i32.add
          i32.const 9
          i32.const 0
          call $f32
        end
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l23
        local.get $p4
        i32.const 8192
        i32.xor
        call $f32
        local.get $p2
        local.get $l23
        local.get $l23
        local.get $p2
        i32.lt_s
        select
        local.set $l12
        br $B3
      end
      local.get $l9
      local.get $p5
      i32.const 26
      i32.shl
      i32.const 31
      i32.shr_s
      i32.const 9
      i32.and
      i32.add
      local.set $l23
      block $B67
        local.get $p3
        i32.const 11
        i32.gt_u
        br_if $B67
        i32.const 12
        local.get $p3
        i32.sub
        local.set $l10
        f64.const 0x1p+4 (;=16;)
        local.set $l26
        loop $L68
          local.get $l26
          f64.const 0x1p+4 (;=16;)
          f64.mul
          local.set $l26
          local.get $l10
          i32.const -1
          i32.add
          local.tee $l10
          br_if $L68
        end
        block $B69
          local.get $l23
          i32.load8_u
          i32.const 45
          i32.ne
          br_if $B69
          local.get $l26
          local.get $p1
          f64.neg
          local.get $l26
          f64.sub
          f64.add
          f64.neg
          local.set $p1
          br $B67
        end
        local.get $p1
        local.get $l26
        f64.add
        local.get $l26
        f64.sub
        local.set $p1
      end
      block $B70
        local.get $l6
        i32.load offset=44
        local.tee $l10
        local.get $l10
        i32.const 31
        i32.shr_s
        local.tee $l10
        i32.add
        local.get $l10
        i32.xor
        i64.extend_i32_u
        local.get $l13
        call $f31
        local.tee $l10
        local.get $l13
        i32.ne
        br_if $B70
        local.get $l6
        i32.const 48
        i32.store8 offset=15
        local.get $l6
        i32.const 15
        i32.add
        local.set $l10
      end
      local.get $l8
      i32.const 2
      i32.or
      local.set $l21
      local.get $p5
      i32.const 32
      i32.and
      local.set $l18
      local.get $l6
      i32.load offset=44
      local.set $l11
      local.get $l10
      i32.const -2
      i32.add
      local.tee $l22
      local.get $p5
      i32.const 15
      i32.add
      i32.store8
      local.get $l10
      i32.const -1
      i32.add
      i32.const 45
      i32.const 43
      local.get $l11
      i32.const 0
      i32.lt_s
      select
      i32.store8
      local.get $p4
      i32.const 8
      i32.and
      local.set $l12
      local.get $l6
      i32.const 16
      i32.add
      local.set $l11
      loop $L71
        local.get $l11
        local.set $l10
        block $B72
          block $B73
            local.get $p1
            f64.abs
            f64.const 0x1p+31 (;=2.14748e+09;)
            f64.lt
            i32.eqz
            br_if $B73
            local.get $p1
            i32.trunc_f64_s
            local.set $l11
            br $B72
          end
          i32.const -2147483648
          local.set $l11
        end
        local.get $l10
        local.get $l11
        i32.const 1568
        i32.add
        i32.load8_u
        local.get $l18
        i32.or
        i32.store8
        local.get $p1
        local.get $l11
        f64.convert_i32_s
        f64.sub
        f64.const 0x1p+4 (;=16;)
        f64.mul
        local.set $p1
        block $B74
          local.get $l10
          i32.const 1
          i32.add
          local.tee $l11
          local.get $l6
          i32.const 16
          i32.add
          i32.sub
          i32.const 1
          i32.ne
          br_if $B74
          block $B75
            local.get $l12
            br_if $B75
            local.get $p3
            i32.const 0
            i32.gt_s
            br_if $B75
            local.get $p1
            f64.const 0x0p+0 (;=0;)
            f64.eq
            br_if $B74
          end
          local.get $l10
          i32.const 46
          i32.store8 offset=1
          local.get $l10
          i32.const 2
          i32.add
          local.set $l11
        end
        local.get $p1
        f64.const 0x0p+0 (;=0;)
        f64.ne
        br_if $L71
      end
      i32.const -1
      local.set $l12
      i32.const 2147483645
      local.get $l21
      local.get $l13
      local.get $l22
      i32.sub
      local.tee $l19
      i32.add
      local.tee $l10
      i32.sub
      local.get $p3
      i32.lt_s
      br_if $B3
      block $B76
        block $B77
          local.get $p3
          i32.eqz
          br_if $B77
          local.get $l11
          local.get $l6
          i32.const 16
          i32.add
          i32.sub
          local.tee $l18
          i32.const -2
          i32.add
          local.get $p3
          i32.ge_s
          br_if $B77
          local.get $p3
          i32.const 2
          i32.add
          local.set $l11
          br $B76
        end
        local.get $l11
        local.get $l6
        i32.const 16
        i32.add
        i32.sub
        local.tee $l18
        local.set $l11
      end
      local.get $p0
      i32.const 32
      local.get $p2
      local.get $l10
      local.get $l11
      i32.add
      local.tee $l10
      local.get $p4
      call $f32
      local.get $p0
      local.get $l23
      local.get $l21
      call $f26
      local.get $p0
      i32.const 48
      local.get $p2
      local.get $l10
      local.get $p4
      i32.const 65536
      i32.xor
      call $f32
      local.get $p0
      local.get $l6
      i32.const 16
      i32.add
      local.get $l18
      call $f26
      local.get $p0
      i32.const 48
      local.get $l11
      local.get $l18
      i32.sub
      i32.const 0
      i32.const 0
      call $f32
      local.get $p0
      local.get $l22
      local.get $l19
      call $f26
      local.get $p0
      i32.const 32
      local.get $p2
      local.get $l10
      local.get $p4
      i32.const 8192
      i32.xor
      call $f32
      local.get $p2
      local.get $l10
      local.get $l10
      local.get $p2
      i32.lt_s
      select
      local.set $l12
    end
    local.get $l6
    i32.const 560
    i32.add
    global.set $g0
    local.get $l12)
  (func $f35 (type $t9) (param $p0 i32) (param $p1 i32)
    (local $l2 i32)
    local.get $p1
    local.get $p1
    i32.load
    i32.const 7
    i32.add
    i32.const -8
    i32.and
    local.tee $l2
    i32.const 16
    i32.add
    i32.store
    local.get $p0
    local.get $l2
    i64.load
    local.get $l2
    i32.const 8
    i32.add
    i64.load
    call $f46
    f64.store)
  (func $f36 (type $t19) (param $p0 f64) (result i64)
    local.get $p0
    i64.reinterpret_f64)
  (func $f37 (type $t2) (param $p0 i32) (result i32)
    block $B0
      local.get $p0
      br_if $B0
      i32.const 0
      return
    end
    call $__errno_location
    local.get $p0
    i32.store
    i32.const -1)
  (func $f38 (type $t1) (result i32)
    i32.const 42)
  (func $f39 (type $t1) (result i32)
    call $f38)
  (func $f40 (type $t1) (result i32)
    i32.const 2848)
  (func $f41 (type $t4)
    i32.const 0
    i32.const 2824
    i32.store offset=2936
    i32.const 0
    call $f39
    i32.store offset=2864)
  (func $f42 (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32)
    i32.const 1
    local.set $l3
    block $B0
      block $B1
        local.get $p0
        i32.eqz
        br_if $B1
        local.get $p1
        i32.const 127
        i32.le_u
        br_if $B0
        block $B2
          block $B3
            call $f40
            i32.load offset=88
            i32.load
            br_if $B3
            local.get $p1
            i32.const -128
            i32.and
            i32.const 57216
            i32.eq
            br_if $B0
            call $__errno_location
            i32.const 25
            i32.store
            br $B2
          end
          block $B4
            local.get $p1
            i32.const 2047
            i32.gt_u
            br_if $B4
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 192
            i32.or
            i32.store8
            i32.const 2
            return
          end
          block $B5
            block $B6
              local.get $p1
              i32.const 55296
              i32.lt_u
              br_if $B6
              local.get $p1
              i32.const -8192
              i32.and
              i32.const 57344
              i32.ne
              br_if $B5
            end
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=2
            local.get $p0
            local.get $p1
            i32.const 12
            i32.shr_u
            i32.const 224
            i32.or
            i32.store8
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            i32.const 3
            return
          end
          block $B7
            local.get $p1
            i32.const -65536
            i32.add
            i32.const 1048575
            i32.gt_u
            br_if $B7
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=3
            local.get $p0
            local.get $p1
            i32.const 18
            i32.shr_u
            i32.const 240
            i32.or
            i32.store8
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=2
            local.get $p0
            local.get $p1
            i32.const 12
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            i32.const 4
            return
          end
          call $__errno_location
          i32.const 25
          i32.store
        end
        i32.const -1
        local.set $l3
      end
      local.get $l3
      return
    end
    local.get $p0
    local.get $p1
    i32.store8
    i32.const 1)
  (func $f43 (type $t5) (param $p0 i32) (param $p1 i32) (result i32)
    block $B0
      local.get $p0
      br_if $B0
      i32.const 0
      return
    end
    local.get $p0
    local.get $p1
    i32.const 0
    call $f42)
  (func $f44 (type $t11) (param $p0 i32) (param $p1 i64) (param $p2 i64) (param $p3 i32)
    (local $l4 i64)
    block $B0
      block $B1
        local.get $p3
        i32.const 64
        i32.and
        i32.eqz
        br_if $B1
        local.get $p1
        local.get $p3
        i32.const -64
        i32.add
        i64.extend_i32_u
        i64.shl
        local.set $p2
        i64.const 0
        local.set $p1
        br $B0
      end
      local.get $p3
      i32.eqz
      br_if $B0
      local.get $p1
      i32.const 64
      local.get $p3
      i32.sub
      i64.extend_i32_u
      i64.shr_u
      local.get $p2
      local.get $p3
      i64.extend_i32_u
      local.tee $l4
      i64.shl
      i64.or
      local.set $p2
      local.get $p1
      local.get $l4
      i64.shl
      local.set $p1
    end
    local.get $p0
    local.get $p1
    i64.store
    local.get $p0
    local.get $p2
    i64.store offset=8)
  (func $f45 (type $t11) (param $p0 i32) (param $p1 i64) (param $p2 i64) (param $p3 i32)
    (local $l4 i64)
    block $B0
      block $B1
        local.get $p3
        i32.const 64
        i32.and
        i32.eqz
        br_if $B1
        local.get $p2
        local.get $p3
        i32.const -64
        i32.add
        i64.extend_i32_u
        i64.shr_u
        local.set $p1
        i64.const 0
        local.set $p2
        br $B0
      end
      local.get $p3
      i32.eqz
      br_if $B0
      local.get $p2
      i32.const 64
      local.get $p3
      i32.sub
      i64.extend_i32_u
      i64.shl
      local.get $p1
      local.get $p3
      i64.extend_i32_u
      local.tee $l4
      i64.shr_u
      i64.or
      local.set $p1
      local.get $p2
      local.get $l4
      i64.shr_u
      local.set $p2
    end
    local.get $p0
    local.get $p1
    i64.store
    local.get $p0
    local.get $p2
    i64.store offset=8)
  (func $f46 (type $t20) (param $p0 i64) (param $p1 i64) (result f64)
    (local $l2 i32) (local $l3 i32) (local $l4 i64) (local $l5 i64)
    global.get $g0
    i32.const 32
    i32.sub
    local.tee $l2
    global.set $g0
    block $B0
      block $B1
        local.get $p1
        i64.const 9223372036854775807
        i64.and
        local.tee $l4
        i64.const -4323737117252386816
        i64.add
        local.get $l4
        i64.const -4899634919602388992
        i64.add
        i64.ge_u
        br_if $B1
        local.get $p0
        i64.const 60
        i64.shr_u
        local.get $p1
        i64.const 4
        i64.shl
        i64.or
        local.set $l4
        block $B2
          local.get $p0
          i64.const 1152921504606846975
          i64.and
          local.tee $p0
          i64.const 576460752303423489
          i64.lt_u
          br_if $B2
          local.get $l4
          i64.const 4611686018427387905
          i64.add
          local.set $l5
          br $B0
        end
        local.get $l4
        i64.const 4611686018427387904
        i64.add
        local.set $l5
        local.get $p0
        i64.const 576460752303423488
        i64.xor
        i64.const 0
        i64.ne
        br_if $B0
        local.get $l5
        local.get $l4
        i64.const 1
        i64.and
        i64.add
        local.set $l5
        br $B0
      end
      block $B3
        local.get $p0
        i64.eqz
        local.get $l4
        i64.const 9223090561878065152
        i64.lt_u
        local.get $l4
        i64.const 9223090561878065152
        i64.eq
        select
        br_if $B3
        local.get $p0
        i64.const 60
        i64.shr_u
        local.get $p1
        i64.const 4
        i64.shl
        i64.or
        i64.const 2251799813685247
        i64.and
        i64.const 9221120237041090560
        i64.or
        local.set $l5
        br $B0
      end
      i64.const 9218868437227405312
      local.set $l5
      local.get $l4
      i64.const 4899634919602388991
      i64.gt_u
      br_if $B0
      i64.const 0
      local.set $l5
      local.get $l4
      i64.const 48
      i64.shr_u
      i32.wrap_i64
      local.tee $l3
      i32.const 15249
      i32.lt_u
      br_if $B0
      local.get $l2
      i32.const 16
      i32.add
      local.get $p0
      local.get $p1
      i64.const 281474976710655
      i64.and
      i64.const 281474976710656
      i64.or
      local.tee $l4
      local.get $l3
      i32.const -15233
      i32.add
      call $f44
      local.get $l2
      local.get $p0
      local.get $l4
      i32.const 15361
      local.get $l3
      i32.sub
      call $f45
      local.get $l2
      i64.load
      local.tee $l4
      i64.const 60
      i64.shr_u
      local.get $l2
      i32.const 8
      i32.add
      i64.load
      i64.const 4
      i64.shl
      i64.or
      local.set $l5
      block $B4
        local.get $l4
        i64.const 1152921504606846975
        i64.and
        local.get $l2
        i64.load offset=16
        local.get $l2
        i32.const 16
        i32.add
        i32.const 8
        i32.add
        i64.load
        i64.or
        i64.const 0
        i64.ne
        i64.extend_i32_u
        i64.or
        local.tee $l4
        i64.const 576460752303423489
        i64.lt_u
        br_if $B4
        local.get $l5
        i64.const 1
        i64.add
        local.set $l5
        br $B0
      end
      local.get $l4
      i64.const 576460752303423488
      i64.xor
      i64.const 0
      i64.ne
      br_if $B0
      local.get $l5
      i64.const 1
      i64.and
      local.get $l5
      i64.add
      local.set $l5
    end
    local.get $l2
    i32.const 32
    i32.add
    global.set $g0
    local.get $l5
    local.get $p1
    i64.const -9223372036854775808
    i64.and
    i64.or
    f64.reinterpret_i64)
  (func $stackSave (type $t1) (result i32)
    global.get $g0)
  (func $stackRestore (type $t3) (param $p0 i32)
    local.get $p0
    global.set $g0)
  (func $stackAlloc (type $t2) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    global.get $g0
    local.get $p0
    i32.sub
    i32.const -16
    i32.and
    local.tee $l1
    global.set $g0
    local.get $l1)
  (func $emscripten_stack_init (type $t4)
    i32.const 5245840
    global.set $g2
    i32.const 2960
    i32.const 15
    i32.add
    i32.const -16
    i32.and
    global.set $g1)
  (func $emscripten_stack_get_free (type $t1) (result i32)
    global.get $g0
    global.get $g1
    i32.sub)
  (func $emscripten_stack_get_end (type $t1) (result i32)
    global.get $g1)
  (func $f53 (type $t21) (param $p0 i32) (param $p1 i32) (param $p2 i64) (param $p3 i32) (result i64)
    local.get $p1
    local.get $p2
    local.get $p3
    local.get $p0
    call_indirect (type $t6) $__indirect_function_table)
  (func $dynCall_jiji (type $t7) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (result i32)
    (local $l5 i64)
    local.get $p0
    local.get $p1
    local.get $p2
    i64.extend_i32_u
    local.get $p3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get $p4
    call $f53
    local.set $l5
    local.get $l5
    i64.const 32
    i64.shr_u
    i32.wrap_i64
    call $env.setTempRet0
    local.get $l5
    i32.wrap_i64)
  (table $__indirect_function_table 6 6 funcref)
  (memory $memory 256 256)
  (global $g0 (mut i32) (i32.const 5245840))
  (global $g1 (mut i32) (i32.const 0))
  (global $g2 (mut i32) (i32.const 0))
  (export "memory" (memory 0))
  (export "__wasm_call_ctors" (func $__wasm_call_ctors))
  (export "main" (func $main))
  (export "__errno_location" (func $__errno_location))
  (export "__stdio_exit" (func $__stdio_exit))
  (export "__indirect_function_table" (table 0))
  (export "emscripten_stack_init" (func $emscripten_stack_init))
  (export "emscripten_stack_get_free" (func $emscripten_stack_get_free))
  (export "emscripten_stack_get_end" (func $emscripten_stack_get_end))
  (export "stackSave" (func $stackSave))
  (export "stackRestore" (func $stackRestore))
  (export "stackAlloc" (func $stackAlloc))
  (export "dynCall_jiji" (func $dynCall_jiji))
  (elem $e0 (i32.const 1) $f7 $f6 $f8 $f34 $f35)
  (data $d0 (i32.const 1024) "-+   0X0x\00-0X+0X 0X-0x+0x 0x\00nan\00inf\00NAN\00INF\00.\00(null)\00Hello, world!\0a\00\00\00\00\00\00\00\00\00\00\00\00\19\00\0a\00\19\19\19\00\00\00\00\05\00\00\00\00\00\00\09\00\00\00\00\0b\00\00\00\00\00\00\00\00\19\00\11\0a\19\19\19\03\0a\07\00\01\00\09\0b\18\00\00\09\06\0b\00\00\0b\00\06\19\00\00\00\19\19\19\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0e\00\00\00\00\00\00\00\00\19\00\0a\0d\19\19\19\00\0d\00\00\02\00\09\0e\00\00\00\09\00\0e\00\00\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0c\00\00\00\00\00\00\00\00\00\00\00\13\00\00\00\00\13\00\00\00\00\09\0c\00\00\00\00\00\0c\00\00\0c\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\00\00\00\00\0f\00\00\00\04\0f\00\00\00\00\09\10\00\00\00\00\00\10\00\00\10\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\12\00\00\00\00\00\00\00\00\00\00\00\11\00\00\00\00\11\00\00\00\00\09\12\00\00\00\00\00\12\00\00\12\00\00\1a\00\00\00\1a\1a\1a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\1a\00\00\00\1a\1a\1a\00\00\00\00\00\00\09\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\14\00\00\00\00\00\00\00\00\00\00\00\17\00\00\00\00\17\00\00\00\00\09\14\00\00\00\00\00\14\00\00\14\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\16\00\00\00\00\00\00\00\00\00\00\00\15\00\00\00\00\15\00\00\00\00\09\16\00\00\00\00\00\16\00\00\16\00\000123456789ABCDEF")
  (data $d1 (i32.const 1584) "\05\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\03\00\00\00\d8\06\00\00\00\04\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\0a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\000\06\00\00"))
